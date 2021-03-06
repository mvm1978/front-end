import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, ResponseContentType} from '@angular/http';

declare let saveAs: any;
declare let jQuery: any;

import {BaseServices} from '../core/base.services';
import {Constants} from '../core/constants';
import {GlobalEventsManager} from '../modules/global-events-manager';

@Injectable()

export class SharedServices extends BaseServices
{

    //**************************************************************************

    constructor(
        protected _http: Http,
        protected _globalEventsManager: GlobalEventsManager
    )
    {
        super();
    }

    //**************************************************************************

    private getMimeType(fileName: string): string
    {
        let extension = '.' + fileName.split('.').pop();

        return Constants.MIME_TYPES.hasOwnProperty(extension) ?
            Constants.MIME_TYPES[extension] : 'text/plain';
    }

    //**************************************************************************

    public downloadBook(url: string, dataset: any): boolean
    {
        let header = this.getHeader(),
            downloadName = dataset.title + '.pdf',
            fileName = url + '/download/' + dataset.source;

        this.fileDownload(fileName, downloadName, header);

        return false;
    }

    //**************************************************************************

    public fileDownload(downloadFile: string, downloadName?: string, authHeader?: any)
    {
        downloadName = downloadName ? downloadName : downloadFile;

        let mimeType = this.getMimeType(downloadFile);

        let header = {
            responseType: ResponseContentType.Blob
        };

        if (authHeader) {
            header = authHeader;
            header['responseType'] = ResponseContentType.Blob;
        }

        this._http.get(downloadFile, header)
            .map((res) => {
                return new Blob([res.blob()], {
                    type: mimeType
                })
            })
            .subscribe(res => {
                saveAs(res, downloadName);
            })
    }

    //**************************************************************************

    public handleInputErrors(data: any): void
    {
        let forceSignIn = data.hasOwnProperty('forceSignIn') && data.forceSignIn,
            response: any = {};

        try {
            response = JSON.parse(data.err._body);
        } catch (err) {
            response['message'] = data.defaultMessage;
        } finally {

            data['response'] = response;

            let authorizationError = this.getAuthorizationError(response.message);

            if (authorizationError) {

                this._globalEventsManager.signOut();

                if (forceSignIn) {
                    this._globalEventsManager.messageBox({
                        text: authorizationError
                    });

                    this._globalEventsManager.forceSignIn();
                }
            }

            data.service.outputErrorInfo(data);
        }
    }

    //**************************************************************************

    public showRowError(id: string, message: string): void
    {
        jQuery('#' + id + '-group').addClass('has-error');
        jQuery('#' + id + '-footer').html(message);
    }

    //**************************************************************************

    public clearRowErrors(id?: string): void
    {
        if (id) {
            jQuery('#' + id + '-group').removeClass('has-error');
            jQuery('#' + id + '-footer').html('');
        } else {
            jQuery('.row-wrapper').removeClass('has-error');
            jQuery('.row-footer').html('');
        }
    }

    //**************************************************************************

    public getParamString(data: any): string
    {
        let params = '';

        Object.keys(data).forEach(function(key) {

            let value = '';

            if (typeof data[key] === 'object' && data[key] !== null) {
                if (jQuery.isEmptyObject(data[key])) {
                    return;
                }

                let stringified = JSON.stringify(data[key])

                value = encodeURI(stringified);
            } else {
                value = data[key];
            }

            params += params ? '&' : '';
            params += key + '=' + value;
        });

        return params;
    }

    //**************************************************************************

    public addPaginationLinkParams(response: any, params: any): any
    {
        delete params['page'];

        let queryParams = this.getParamString(params);

        for (let key of ['prev_page_url', 'next_page_url']) {
            response[key] += response[key] ? '&' + queryParams : '';
        }

        return response;
    }

    //**************************************************************************

    public getAddPopupInfo(addPopupInfo: any, gridInfo: any): any
    {
        let rows = [];

        for (let key in gridInfo.columnDefs) {
            if (gridInfo.columnDefs.hasOwnProperty(key)) {

                let colInfo = gridInfo.columnDefs[key];

                if (colInfo.hasOwnProperty('addRow')) {

                    let addRow = colInfo.addRow;

                    addRow['id'] = colInfo.field;
                    addRow['caption'] = colInfo.headerName;

                    if (colInfo.hasOwnProperty('cellEditor')) {

                        if (colInfo.cellEditor == 'select') {

                            let info = colInfo.cellEditorParams;

                            addRow['id'] = info.foreignKey;
                            addRow['dropdown'] = info.values;
                            addRow['dbValues'] = info.dbValues;
                        }

                        if (colInfo.cellEditor == 'uploader') {
                            addRow['uploader'] = true;
                        }
                    }

                    rows.push(addRow);
                }
            }
        }

        if (rows.length) {
            addPopupInfo['rows'] = rows;
            addPopupInfo['service'] = gridInfo.service;
            addPopupInfo['parent'] = gridInfo.gridID;
        }

        return addPopupInfo;
    }

    //**************************************************************************

    public getAuthorizationError(message: string): string
    {
        switch (message) {
            case 'invalid_token':
                return 'Unauthorized access. Please sign up.';
            default:
                break;
        }

        return '';
    }

    //**************************************************************************

    public createReportPDF(params: any, api: string, services: any): void
    {
        services.createReportPDF(params)
            .subscribe(
                response => {

                    let file = api + '/download-report-pdf/' + response.report,
                        fileName = 'report.pdf'

                    this.fileDownload(file, fileName);
                },
                err => {},
                () => {}
            );
    }

    //**************************************************************************

    public getHeader()
    {
        let header = new Headers();

        header.append('Content-Type', 'application/json');

        return new RequestOptions({
            headers: header
        });
    }

    //**************************************************************************

    public checkIfOuterClick(x: number, y: number, $content: any): boolean
    {
        if (! $content.length) {
            return false;
        }

        let offset = $content.position();

        let height = $content.outerHeight(),
            width = $content.outerWidth(),
            top = offset.top,
            left = offset.left;

        return x < left || x > left + width || y < top || y > top + height;
    }

    //**************************************************************************

}
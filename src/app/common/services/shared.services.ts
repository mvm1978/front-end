import {Injectable} from '@angular/core';
import {Http, ResponseContentType} from '@angular/http';

declare var saveAs: any;
declare var jQuery: any;

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

    private getMimeType(fileName: string)
    {
        let extension = '.' + fileName.split('.').pop();

        return Constants.MIME_TYPES.hasOwnProperty(extension) ?
            Constants.MIME_TYPES[extension] : 'text/plain';
    }

    //**************************************************************************

    public fileDownload(downloadFile: string, downloadName?: string)
    {
        downloadName = downloadName ? downloadName : downloadFile;

        let mimeType = this.getMimeType(downloadFile);

        this._http.get('/downloads/' + downloadFile, {
                responseType: ResponseContentType.Blob
            })
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

    public handleInputErrors(data: any)
    {
        let forseSignIn = false,
            message = '',
            response: any = {};

        try {
            response = JSON.parse(data.err._body);
        } catch (err) {
            message = data.defaultMessage;
        } finally {
            if (response.hasOwnProperty('message')) {

                if (response.message == 'unauthorized') {
                    forseSignIn = true;
                } else {

                    let info = data.service.getErrorInfo(response, data.defaultMessage);

                    message = info.message;
                    forseSignIn = info.forseSignIn;
                }
            }
        }

        if (forseSignIn) {

            this._globalEventsManager.messageBox({
                text: message + '. Please sign in.'
            });

            this._globalEventsManager.forceSignIn();
        } else if (data.hasOwnProperty('footer') && data.footer) {
            if (jQuery('#' + data.footer + '-footer').length) {
                jQuery('#' + data.footer + '-footer').html(message);
            }
        }

        return message;
    }

    //**************************************************************************

    public showRowError(id: string, message: string)
    {
        jQuery('#' + id + '-group').addClass('has-error');
        jQuery('#' + id + '-footer').html(message);
    }

    //**************************************************************************

    public clearRowErrors(id?: string)
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

}
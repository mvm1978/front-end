import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';

import {AuthServices} from '../../../../auth/auth.services';
import {SharedServices} from '../../../services/shared.services';

import {Constants} from '../../../core/constants';

@Component({
    selector: 'download-button',
    templateUrl: Constants.AG_GRID_DOWNLOAD_BUTTON + 'download-button.component.html',
    styleUrls: [
        Constants.AG_GRID_DOWNLOAD_BUTTON + 'download-button.component.css'
    ]
})

export class DownloadButtonComponent implements ICellRendererAngularComp
{
    public params: any;

    constructor(
        private _authServices: AuthServices,
        private _sharedServices: SharedServices
    ) {

    }

    //**************************************************************************

    agInit(params: any): void
    {
        this.params = params;
    }

    //**************************************************************************

    onClick(): boolean
    {
        let header = this._authServices.getAuthHeader(),
            downloadName = this.params.data.title + '.pdf',
            fileName = this.params.colDef.downloadUrl + this.params.value;

        this._sharedServices.fileDownload(fileName, downloadName, header);

        return false;
    }

    //**************************************************************************

    refresh(): boolean
    {
        return false;
    }

    //**************************************************************************

}
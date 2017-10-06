import {Component, Input} from '@angular/core';

import {Constants} from '../../../common/core/constants';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

import {CredentialsRowServices} from './credentials-row.services';
import {AuthServices} from '../../../auth/auth.services';

declare var jQuery: any;

@Component({
    selector: 'credentials-row',
    providers: [
        CredentialsRowServices
    ],
    templateUrl: Constants.AUTH_LAYOUTS_PATH + 'credentials-row/credentials-row.component.html',
    styleUrls: [
        Constants.AUTH_LAYOUTS_PATH + 'credentials-row/credentials-row.component.css'
    ],
})

export class CredentialsRowComponent
{
    @Input() rows: any;

    //**************************************************************************

    constructor (
        private _сredentialsRowServices: CredentialsRowServices,
        private _globalEventsManager: GlobalEventsManager,
        private _authServices: AuthServices
    )
    {

    }

    //**************************************************************************

    public onKeyPress(id: string)
    {
        jQuery('#' + id + '-group').removeClass('has-error');
        jQuery('#' + id + '-footer').html('');
    }

    //**************************************************************************

    public verify()
    {
        let results: any = {};

        jQuery('.row-wrapper').removeClass('has-error');
        jQuery('.row-footer').html('');

        results = this._сredentialsRowServices.validate(this.rows);

        return results;
    }

    //**************************************************************************

}

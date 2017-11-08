import {Component, Input} from '@angular/core';

import {Constants} from '../../../common/core/constants';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';
import {SharedServices} from '../../../common/services/shared.services';
import {AuthServices} from '../../../auth/auth.services';

import {CredentialsRowServices} from './credentials-row.services';

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
        private _sharedServices: SharedServices,
        private _authServices: AuthServices
    )
    {

    }

    //**************************************************************************

    public onKeyPress(id: string)
    {
        this._sharedServices.clearRowErrors(id);
    }

    //**************************************************************************

    public verify()
    {
        let results: any = {};

        this._sharedServices.clearRowErrors();

        results = this._сredentialsRowServices.validate(this.rows);

        return results;
    }

    //**************************************************************************

}

import {Injectable} from '@angular/core';

import {GlobalEventsManager} from '../../modules/global-events-manager';
import {SharedServices} from '../../services/shared.services';

declare var jQuery: any;

@Injectable()

export class RowInputGroupServices
{
    constructor(
        private _globalEventsManager: GlobalEventsManager,
        private _sharedServices: SharedServices
    )
    {

    }

    //**************************************************************************

    public clearError(id: string): void
    {
        jQuery('#' + id + '-group').removeClass('has-error');
        jQuery('#' + id + '-footer').html('');
    }

    //**************************************************************************

}
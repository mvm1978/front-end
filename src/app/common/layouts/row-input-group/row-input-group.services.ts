import {Injectable} from '@angular/core';

declare let jQuery: any;

@Injectable()

export class RowInputGroupServices
{
    constructor()
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
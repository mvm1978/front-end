import {Injectable} from '@angular/core';

import {BaseServices} from '../../../common/services/base.services';
import {ValidateInputServices} from '../../../common/services/validate-input.services';
import {AuthServices} from '../../auth.services';

declare var jQuery: any;

@Injectable()

export class CredentialsRowServices extends BaseServices
{
    constructor (
        private _validateInputServices: ValidateInputServices,
        private _authServices: AuthServices
    )
    {
        super();
    }

    //**************************************************************************

    public validate(stru: any)
    {
        let results: any = {
            isValid: true,
            data: {}
        };

        jQuery('.row-wrapper').removeClass('has-error');
        jQuery('.row-footer').html('');

        for (let rowCount=0; rowCount<stru.length; rowCount++) {

            let row = stru[rowCount],
                message = '';

            let id = row.id,
                caption = row.hasOwnProperty('footer-nickname') ?
                        row['footer-nickname'] : row.caption;

            let value = jQuery('#' + id).val();

            if (row.hasOwnProperty('mandatory') && row.mandatory && ! value) {
                message = caption + ' is mandatory';
            } else if (value && row.hasOwnProperty('validate')) {
                message = this.cellValidate(row);
            }

            results.data[id] = value;

            if (message) {

                this._authServices.showRowError(id, message);

                results.isValid = false;
            }
        }

        return results;
    }

    //**************************************************************************

    private cellValidate(row: any)
    {
        let _service = this._validateInputServices,
            value = jQuery('#' + row.id).val();

        switch (row.validate) {
            case 'email':
                return this._validateInputServices.validateEmail(value) ? '' :
                    'Invalid ' + row.caption;
            case 'phone':
                return this._validateInputServices.validatePhone(value) ? '' :
                    'Invalid ' + row.caption;
            case 'website':
                return this._validateInputServices.validateWebSite(value) ? '' :
                    'Invalid ' + row.caption;
            case 'username':
                if (value.length < 4) {
                    return 'Username must be at least 4 characters';
                } else if (_service.validateEmail(value)) {
                    return 'Username can not be email';
                }

                break;
            case 'password':
                return this._validateInputServices.validatePassword(value) ? '' :
                    'Password must have 1-Upper, 1-Num, 1-Special and at least 8 characters';
            case 'confirm':
                return value == jQuery('#' + row.target).val() ? '' :
                    'Passwords do not match';;
            default:
                break;
        }

        return '';
    }

    //**************************************************************************

}
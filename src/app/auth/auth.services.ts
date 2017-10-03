import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiRoot} from '../common/api-root';

import {GlobalEventsManager} from '../common/modules/global-events-manager';

declare var jQuery: any;

@Injectable()

export class AuthServices
{
    constructor(
        private _apiRoot: ApiRoot,
        private _httpModule: Http,
        private _globalEventsManager: GlobalEventsManager
    )
    {

    }

    private _api = this._apiRoot.authApi + '/auth';

    protected _http = this._httpModule;

    //**************************************************************************

    public getHeader()
    {
        let authHeader = new Headers();

        authHeader.append('Content-Type', 'application/json');

        return authHeader;
    }

    //**************************************************************************

    public getAuthHeader()
    {
        let authHeader = new Headers();

        var token = this.getUserToken(),
            userID = this.getUserID();

        authHeader.append('Content-Type', 'application/json');
        authHeader.append('token', token);
        authHeader.append('id', userID);

        return authHeader;
    }

    //**************************************************************************

    public signUp(body: any)
    {
        let url = this._api + '/register';

        return this._http.post(url, body).map(res => res.json());
    }

    //**************************************************************************

    public signIn(username: string, password: string)
    {
        let url = this._api + '/login',
            body = {
                username: username,
                password: password
            };

        return this._http.post(url, body).map(res => res.json());
    }

    //**************************************************************************

    public passwordReset(oldPassword: string, newPassword: string)
    {
        let url = this._api + '/password-reset',
            body = {
                userID: localStorage.getItem('userID'),
                oldPassword: oldPassword,
                newPassword: newPassword
            };

        return this._http.post(url, body).map(res => res.json());
    }

    //**************************************************************************

    public passwordRecoveryEmail(email: string)
    {
        let url = this._api + '/password-recovery-by-email',
            body = {
                email: email
            };

        return this._http.post(url, body).map(res => res.json());
    }

    //**************************************************************************

    public getRecoveryQuestions()
    {
        let url = this._api + '/questions/get';

        return this._http.get(url).map(res => res.json());
    }

    //**************************************************************************

    private getUserToken()
    {
        return localStorage.getItem('userToken');
    }

    //**************************************************************************

    private getUserID()
    {
        return localStorage.getItem('userID');
    }

    //**************************************************************************

    public showRowError(id: string, message: string)
    {
        jQuery('#' + id + '-footer').html(message);
        jQuery('#' + id + '-group').addClass('has-error');
    }

    //**************************************************************************

    public showSigningError(err: any, defaultMessage: string)
    {
        let message = '',
            error = JSON.parse(err._body);

        switch (error.message) {
            case 'password_expired':
                message = 'Password expired';
                break;
            case 'invalid_login_or_password':
                message = 'Invalid User ID or Password';
                break;
            case 'failed_to_create_token':
                message = 'Failed to create a token';
                break;
            case 'missing_username':
                this.showRowError('username', 'User Name is mandatory');
                break;
            case 'username_exists':
                this.showRowError('username', 'Username exists');
                break;
            case 'email_exists':
                this.showRowError('email', 'Email exists');
                break;
            case 'email_does_not_exist':
                this.showRowError('email', 'Email does not exist');
                break;
            case 'missing_password':
                this.showRowError('password', 'Password is mandatory');
                break;
            case 'invalid_old_password':
                this.showRowError('old-password', 'Old password is invalid');
                break;
            default:
                message = defaultMessage;
                break;
        }

        jQuery('#sign-footer').html(message);

        this._globalEventsManager.showLoadingOverload(false);

        return message;
    }

    //**************************************************************************

}

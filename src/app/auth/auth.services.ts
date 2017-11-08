import {Injectable} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiRoot} from '../common/api-root';
import {SharedServices} from '../common/services/shared.services';

declare var jQuery: any;

@Injectable()

export class AuthServices
{
    private _api = this._apiRoot.authApi + '/auth';

    constructor(
        private _platformLocation: PlatformLocation,
        private _apiRoot: ApiRoot,
        private _http: Http,
        private _sharedServices: SharedServices
    )
    {

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

    public getAuthHeader()
    {
        let authHeader = new Headers();

        var token = this.getUserInfoValue('token'),
            userID = this.getUserInfoValue('id');

        authHeader.append('Content-Type', 'application/json');
        authHeader.append('token', token);
        authHeader.append('id', userID);

        return new RequestOptions({
            headers: authHeader
        });
    }

    //**************************************************************************

    public signUp(body: any)
    {
        let url = this._api + '/users';

        return this._http.post(url, body).map(res => res.json());
    }

    //**************************************************************************

    public updateUserInfo(body: any)
    {
        let url = this._api + '/users',
            header = this.getAuthHeader();

        return this._http.put(url, body, header).map(res => res.json());
    }

    //**************************************************************************

    public updateRecoveryQuestions(body: any)
    {
        let url = this._api + '/user-questions',
            header = this.getAuthHeader();

        return this._http.put(url, body, header).map(res => res.json());
    }

    //**************************************************************************

    public signIn(username: string, password: string)
    {
        let url = this._api + '/users/login',
            header = this.getHeader(),
            body = {
                username: username,
                password: password
            };

        return this._http.post(url, body, header).map(res => res.json());
    }

    //**************************************************************************

    public passwordReset(body: any)
    {
        let url = this._api + '/users/password';

        if (localStorage.hasOwnProperty('password-recovery-token')) {
            body['recoveryToken'] = localStorage.getItem('password-recovery-token');
        } else {
            body['userID'] = this.getUserInfoValue('id');
        }

        return this._http.put(url, body).map(res => res.json());
    }

    //**************************************************************************

    public passwordRecoveryEmail(email: string)
    {
        let platform: any = this._platformLocation;

        let url = this._api + '/users/password',
            body = {
                email: email,
                url: platform['location']['href']
            };

        return this._http.patch(url, body).map(res => res.json());
    }

    //**************************************************************************

    public getRecoveryQuestions()
    {
        let url = this._api + '/questions';

        return this._http.get(url).map(res => res.json());
    }

    //**************************************************************************

    public getRecoveryQuestion(username: string)
    {
        let url = this._api + '/user-questions/' + username;

        return this._http.get(url).map(res => res.json());
    }

    //**************************************************************************

    public verifyRecoveryQuestion(username: string, body: any)
    {
        let url = this._api + '/user-questions/' + username;

        return this._http.patch(url, body).map(res => res.json());
    }

    //**************************************************************************

    public signOut()
    {
        localStorage.removeItem('userInfo');
    }

    //**************************************************************************

    public getUserInfo()
    {
        let userInfo = localStorage.getItem('userInfo');

        return userInfo ? JSON.parse(userInfo) : {};
    }

    //**************************************************************************

    public getUserInfoValue(field: string)
    {
        let userInfo = this.getUserInfo();

        return userInfo.hasOwnProperty(field) ? userInfo[field] : null;
    }

    //**************************************************************************

    public showRowError(id: string, message: string)
    {
        this._sharedServices.showRowError(id, message);
    }

    //**************************************************************************

    public checkRecoveryQuestions(): {questions: any, duplicate: any, noAnswer: any}
    {
        let results: any = {
            questions: {},
            duplicate: [],
            noAnswer: []
        };

        jQuery('.question-dropdown').map(function(count: number) {

            let questionID = jQuery('option:selected', this).val(),
                answer = jQuery('#answer-' + count).val();
            // checking for duplicate question being seleted
            if (results.questions.hasOwnProperty(questionID)) {
                results.duplicate.push(count);
            }

            if (answer) {
                results.questions[questionID] = answer;
            } else {
                results.noAnswer.push(count)
            }
        });

        for (let count=0;count<results.duplicate.length; count++) {

            let id = 'question-' + results.duplicate[count];

            this.showRowError(id, 'Duplicate question');
        }

        for (let count=0;count<results.noAnswer.length; count++) {

            let id = 'question-' + results.noAnswer[count];

            this.showRowError(id, 'Answer for the question is mandatory');
        }

        return results;
    }

    //**************************************************************************

    public checkToken(): void
    {
        let url = this._api + '/users/token',
            header = this.getAuthHeader();

        this._http.get(url, header)
            .map(res => res.json())
            .subscribe(
                response => {},
                err => {
                    this.showError(err, 'Unknown Error');
                },
                () => {}
            );
    }

    //**************************************************************************

    public showError(err: any, defaultMessage: string): string
    {
        return this._sharedServices.handleInputErrors({
            err: err,
            defaultMessage: defaultMessage,
            service: this,
            footer: 'sign'
        });
    }

    //**************************************************************************

    public getErrorInfo(response, defaultMessage): {message: string, forseSignIn: boolean}
    {
        let message: string = '',
            forseSignIn: boolean = false;

        switch (response['message']) {
            case 'password_expired':
                message = 'Password expired';
                break;
            case 'invalid_login_or_password':
                message = 'Invalid User ID or Password';
                break;
            case 'invalid_token':
                forseSignIn = true;
                message = 'Invalid token. You was signed out';
                break;
            case 'invalid_or_expired_token':
                forseSignIn = true;
                message = 'Invalid or expired token. You was signed out';
                break;
            case 'failed_to_create_token':
                message = 'Failed to create a token';
                break;
            case 'missing_password_recovery_token':
                message = 'Missing password recovery token';
                break;
            case 'password_recovery_token_expired':
                forseSignIn = true;
                message = 'Password recovery token expired';
                break;
            case 'error_updating_user_info':
                message = 'Error updating user info';
                break;
            case 'error_updating_recovery_questions':
                message = 'Error updating recovery questions';
                break;
            case 'error_recovering_password':
                message = 'Error recovering password';
                break;
            case 'failed_to_get_user':
                message = 'Failed to get user';
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

        return {
            message: message,
            forseSignIn: forseSignIn
        }
    }

    //**************************************************************************

}

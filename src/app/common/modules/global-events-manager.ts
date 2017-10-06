import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {SharedService} from './shared.service'

@Injectable()

export class GlobalEventsManager
{
    private isLoadingOverlay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private isFooter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private isSignUp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isSignIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isSignOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isPasswordReset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isPasswordRecovery: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private isMessageBox: BehaviorSubject<any> = new BehaviorSubject<string>(null);

    public showLoadingOverlayEmitter: Observable<boolean> = this.isLoadingOverlay.asObservable();
    public showHeaderEmitter: Observable<boolean> = this.isHeader.asObservable();
    public showFooterEmitter: Observable<boolean> = this.isFooter.asObservable();

    public signUpEmitter: Observable<boolean> = this.isSignUp.asObservable();
    public signInEmitter: Observable<boolean> = this.isSignIn.asObservable();
    public signOutEmitter: Observable<boolean> = this.isSignOut.asObservable();
    public passwordResetEmitter: Observable<boolean> = this.isPasswordReset.asObservable();
    public passwordRecoveryEmitter: Observable<boolean> = this.isPasswordRecovery.asObservable();

    public signedInEmitter: Observable<boolean> = this.isSignedIn.asObservable();

    public messageBoxEmitter: Observable<any> = this.isMessageBox.asObservable();

    //**************************************************************************

    constructor(
        private _sharedService: SharedService
    )
    {

    }

    //**************************************************************************

    showHeader(isHeader: boolean)
    {
        this.isHeader.next(isHeader);
    }

    //**************************************************************************

    showFooter(isFooter: boolean)
    {
        this.isFooter.next(isFooter);
    }

    //**************************************************************************

    public showLoadingOverload(isLoadingOverlay: boolean)
    {
        this.isLoadingOverlay.next(isLoadingOverlay);
    };

    //**************************************************************************

    public forceSignIn()
    {
        let app = this._sharedService.get('app');

        this.isSignUp.next(false);

        window.open('/#/' + app + '/welcome', '_self');

        this.showLoadingOverload(false);
    };

    //**************************************************************************

    public signUp(isSignUp: boolean)
    {
        this.isSignUp.next(isSignUp);
    };

    //**************************************************************************

    public signIn(isSignIn: boolean)
    {
        this.isSignIn.next(isSignIn);
    };

    //**************************************************************************

    public passwordReset(isPasswordReset: boolean)
    {
        this.isPasswordReset.next(isPasswordReset);
    };

    //**************************************************************************

    public passwordRecovery(isPasswordRecovery: boolean)
    {
        this.isPasswordRecovery.next(isPasswordRecovery);
    };

    //**************************************************************************

    public signedIn(isSignedIn: boolean)
    {
        this.isSignedIn.next(isSignedIn);
    };

    //**************************************************************************

    public messageBox(data: any)
    {
        this.isMessageBox.next(data);
    };

    //**************************************************************************

}
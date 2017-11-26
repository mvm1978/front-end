import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {BaseServices} from '../core/base.services'

@Injectable()

export class GlobalEventsManager
{
    private isLoadingOverlay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private isFooter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    /* Authorization */
    private showAuthPopup: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private isSignOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isUpdateUserHome: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /* Message Box */
    private isMessageBox: BehaviorSubject<any> = new BehaviorSubject<string>(null);

    public showLoadingOverlayEmitter: Observable<boolean> = this.isLoadingOverlay.asObservable();
    public showHeaderEmitter: Observable<boolean> = this.isHeader.asObservable();
    public showFooterEmitter: Observable<boolean> = this.isFooter.asObservable();
    /* Authorization */
    public authPopupEmitter: Observable<string> = this.showAuthPopup.asObservable();
    public signOutEmitter: Observable<boolean> = this.isSignOut.asObservable();
    public updateUserHomeEmitter: Observable<boolean> = this.isUpdateUserHome.asObservable();

    public signedInEmitter: Observable<boolean> = this.isSignedIn.asObservable();
    /* Message Box */
    public messageBoxEmitter: Observable<any> = this.isMessageBox.asObservable();

    //**************************************************************************

    constructor(
        private _baseServices: BaseServices
    )
    {

    }

    //**************************************************************************

    showHeader(isHeader: boolean): void
    {
        this.isHeader.next(isHeader);
    }

    //**************************************************************************

    showFooter(isFooter: boolean): void
    {
        this.isFooter.next(isFooter);
    }

    //**************************************************************************

    public showLoadingOverload(isLoadingOverlay: boolean): void
    {
        this.isLoadingOverlay.next(isLoadingOverlay);
    };

    //**************************************************************************

    public forceSignIn(): void
    {
        let app = this._baseServices.get('app');

        this.authPopup('Sign In');
        this.isSignedIn.next(false);

        window.open('/#/' + app + '/home', '_self');

        this.showLoadingOverload(false);
    };

    //**************************************************************************

    public authPopup(title: string): void
    {
        this.showAuthPopup.next(title);
    };

    //**************************************************************************

    public updateUserHome(): void
    {
        this.isUpdateUserHome.next(true);
    };

    //**************************************************************************

    public signedIn(isSignedIn: boolean): void
    {
        this.authPopup('');
        this.isSignedIn.next(isSignedIn);
    };

    //**************************************************************************

    public signOut(): void
    {
        localStorage.removeItem('userInfo');
    };

    //**************************************************************************

    public messageBox(data: any): void
    {
        this.isMessageBox.next(data);
    };

    //**************************************************************************

}
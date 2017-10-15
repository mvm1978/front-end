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

    private showAuthPopup: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private isSignOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isUpdateUserWelcome: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private isSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private isMessageBox: BehaviorSubject<any> = new BehaviorSubject<string>(null);

    public showLoadingOverlayEmitter: Observable<boolean> = this.isLoadingOverlay.asObservable();
    public showHeaderEmitter: Observable<boolean> = this.isHeader.asObservable();
    public showFooterEmitter: Observable<boolean> = this.isFooter.asObservable();

    public authPopupEmitter: Observable<string> = this.showAuthPopup.asObservable();
    public signOutEmitter: Observable<boolean> = this.isSignOut.asObservable();
    public updateUserWelcomeEmitter: Observable<boolean> = this.isUpdateUserWelcome.asObservable();

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

        this.authPopup('Sign In');
        this.isSignedIn.next(false);

        window.open('/#/' + app + '/welcome', '_self');

        this.showLoadingOverload(false);
    };

    //**************************************************************************

    public authPopup(title: string)
    {
        this.showAuthPopup.next(title);
    };

    //**************************************************************************

    public updateUserWelcome()
    {
        this.isUpdateUserWelcome.next(true);
    };

    //**************************************************************************

    public signedIn(isSignedIn: boolean)
    {
        this.authPopup('');
        this.isSignedIn.next(isSignedIn);
    };

    //**************************************************************************

    public signOut()
    {
        localStorage.removeItem('userInfo');
    };

    //**************************************************************************

    public messageBox(data: any)
    {
        this.isMessageBox.next(data);
    };

    //**************************************************************************

}
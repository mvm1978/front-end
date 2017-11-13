import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

import {SharedServices} from '../../../common/services/shared.services';
import {AuthServices} from '../../../auth/auth.services';

declare var jQuery: any;

@Component({
    selector: 'header',
    providers: [
        AuthServices
    ],
    templateUrl: './app/common/layouts/header/header.component.html',
    styleUrls: [
        './app/common/layouts/header/header.component.css'
    ]
})

export class HeaderComponent
{
    public isHeader: boolean = false;
    public isSignedIn: boolean = false;
    public userHomeName: string = '';
    public signMenu: any = {
        signedOut: [
            {
                caption: 'Sign Up',
                glyphicon: 'user'
            },
            {
                caption: 'Sign In',
                glyphicon: 'log-in'
            }
        ],
        signedIn: [
            {
                caption: 'Password Reset',
                glyphicon: 'lock'
            },
            {
                caption: 'User Info',
                glyphicon: 'user'
            },
            {
                caption: 'Sign Out',
                glyphicon: 'log-out'
            }
        ]
    };

    private showHeaderSubscription: any = null;
    private signedInSubscription: any = null;
    private updateUserHomeSubscription: any = null;

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _sharedServices: SharedServices,
        private _authServices: AuthServices
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this.showHeaderSubscription = this._globalEventsManager.showHeaderEmitter
            .subscribe((isHeader) => {
                this.isHeader = isHeader;
            }
        );

        this.signedInSubscription = this._globalEventsManager.signedInEmitter
            .subscribe((isSignedIn) => {
                this.isSignedIn = isSignedIn;
            }
        );

        this.updateUserHomeSubscription = this._globalEventsManager.updateUserHomeEmitter
            .subscribe(() => {
                this.updateUserHome();
            }
        );
    }

    //**************************************************************************

    private ngOnDestroy()
    {
        this.showHeaderSubscription.unsubscribe();
        this.signedInSubscription.unsubscribe();
        this.updateUserHomeSubscription.unsubscribe();
    }

    //**************************************************************************

    public mouseEnter(target: any)
    {
        let id = target.attributes.id.nodeValue;

        jQuery('#' + id + ' .dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }

    //**************************************************************************

    public mouseLeave(target: any)
    {
        let id = target.attributes.id.nodeValue;

        jQuery('#' + id + ' .dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    }

    //**************************************************************************

    public onClick(caption: string)
    {
        if (caption == 'Sign Out') {

            this._globalEventsManager.signOut();

            this.isSignedIn = false;
        } else {
            this._globalEventsManager.authPopup(caption);
        }
    }

    //**************************************************************************

    private updateUserHome()
    {
        this.isSignedIn = this._authServices.getUserInfoValue('token') != undefined;

        if (this.isSignedIn) {
            this.userHomeName = this._authServices.getUserInfoValue('fullName');
        }
    }

    //**************************************************************************

    public onResumeDownload()
    {
        this._sharedServices.fileDownload('Resume.doc', 'test.doc');
    }

    //**************************************************************************

}

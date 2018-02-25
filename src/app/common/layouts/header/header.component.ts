import {Component, HostListener} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';
import {Constants} from '../../../common/core/constants';

import {SharedServices} from '../../../common/services/shared.services';
import {AuthServices} from '../../../auth/auth.services';

declare let jQuery: any;

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

    private ngOnInit(): void
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

    private ngOnDestroy(): void
    {
        this.showHeaderSubscription.unsubscribe();
        this.signedInSubscription.unsubscribe();
        this.updateUserHomeSubscription.unsubscribe();
    }

    //**************************************************************************

    @HostListener("window:scroll", [])
    onWindowScroll(): void
    {
        if (jQuery(window).innerWidth() > Constants.BOOTSTRAP_MOBILE_WINDOW_MAX_WIDTH) {
            if (jQuery(window).scrollTop()) {
                jQuery('.caption').hide(100);
                jQuery('#site-caption').hide();
                jQuery('#main-navbar').addClass('small-main-navbar');
                jQuery('#main-header').addClass('small-header');
                jQuery('#main-header a').addClass('small-icon');
            } else {
                jQuery('.caption').show(100);
                jQuery('#site-caption').show();
                jQuery('#main-navbar').removeClass('small-main-navbar');
                jQuery('#main-header').removeClass('small-header');
                jQuery('#main-header a').removeClass('small-icon');
            }
        }
    }

    //**************************************************************************

    public mouseEnter(target: any): void
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

    public onLibraryMenuClick(): boolean
    {
        return false;
    }

    //**************************************************************************

    public onClick(caption: string): boolean
    {
        if (caption == 'Sign Out') {

            this._globalEventsManager.signOut();

            this.isSignedIn = false;
        } else {
            this._globalEventsManager.authPopup(caption);
        }

        return false;
    }

    //**************************************************************************

    private updateUserHome(): void
    {
        this.isSignedIn = this._authServices.getUserInfoValue('token') != undefined;

        if (this.isSignedIn) {
            this.userHomeName = this._authServices.getUserInfoValue('fullName');
        }
    }

    //**************************************************************************

    public onResumeDownload(): boolean
    {
        this._sharedServices.fileDownload('/downloads/Resume.doc', 'Resume.doc');

        return false;
    }

    //**************************************************************************

}

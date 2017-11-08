import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

import {SharedServices} from '../../../common/services/shared.services';
import {AuthServices} from '../../../auth/auth.services';

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
        this._globalEventsManager.showHeaderEmitter
            .subscribe((isHeader) => {
                this.isHeader = isHeader;
            }
        );

        this._globalEventsManager.signedInEmitter
            .subscribe((isSignedIn) => {
                this.isSignedIn = isSignedIn;
            }
        );

        this._globalEventsManager.updateUserHomeEmitter
            .subscribe(() => {
                this.updateUserHome();
            }
        );
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

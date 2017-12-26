import {Component} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {GlobalEventsManager} from '../common/modules/global-events-manager';
import {Constants} from '../common/core/constants';

declare let jQuery: any;

@Component({
    selector: 'home',
    templateUrl: Constants.HOME_PATH + 'home.component.html',
    styleUrls: [
        Constants.HOME_PATH + 'home.component.css'
    ],
})

export class HomeComponent
{
    private greetingFadeIn = 2000;
    private greetingInterval = 5000;
    private greetingFadeOut = 2500;

    public greetings: any = [
        '',
        'Welcome to Virtual Library!',
        'You need not to authorize in order to download a book',
        'Authorization does not require email',
        'Only authorized users can upload books',
        'Only authorized users can "like" or dislike" a book',
    ];

    public greetingText: string = '';

    //**************************************************************************

    constructor (
        private activatedRoute: ActivatedRoute,
        private _globalEventsManager: GlobalEventsManager
    )
    {

    }

    //**************************************************************************

    private ngOnInit(): void
    {
        localStorage.removeItem('password-recovery-token');

        this.activatedRoute.queryParams
            .subscribe(response => {
                if (response.hasOwnProperty('password-recovery-token')) {
                    // password reset by email was requested
                    localStorage.setItem('password-recovery-token',
                            response['password-recovery-token']);
                    // redirect to password reset page
                    this._globalEventsManager.authPopup('Password Reset');
                    this._globalEventsManager.signOut();
                }
            });

        this.showGreetings();
    }

    //**************************************************************************

    private showGreetings(): void
    {
        let index = 0,
            that = this;

        jQuery('.greeting').eq(index).fadeIn(this.greetingFadeIn);

        setInterval(function() {

            let $greetings = jQuery('.greeting');

            $greetings.not($greetings.eq(index)).hide();
            $greetings.eq(index).fadeOut(that.greetingFadeOut);

            index = index == that.greetings.length - 1 ? 0 : index + 1;

            $greetings.eq(index).fadeIn(that.greetingFadeOut);

        }, this.greetingInterval);
    }

    //**************************************************************************

}
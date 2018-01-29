import {Component} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {GlobalEventsManager} from '../common/modules/global-events-manager';
import {Constants} from '../common/core/constants';

import {ApiServices} from '../virtual-library/api.services';
import {SharedServices} from '../common/services/shared.services';
import {booksServices} from '../virtual-library/book/book.services';

declare let jQuery: any;

@Component({
    selector: 'home',
    providers: [
        booksServices
    ],
    templateUrl: Constants.HOME_PATH + 'home.component.html',
    styleUrls: [
        Constants.HOME_PATH + 'home.component.css'
    ],
})

export class HomeComponent
{
    private fadeInOut: any = {
        greeting: {
            fadeIn: 2000,
            interval: 5000,
            fadeOut: 2500
        }
    };

    public greetings: any = [
        '',
        'Welcome to Virtual Library!',
        'You need not to authorize in order to download a book',
        'Authorization does not require email',
        'Only authorized users can upload books',
        'Only authorized users can "upvote" or "downvote" a book'
    ];

    public topBooksAmount: number = 5;
    public topBooks: any = [];
    public urlRoot: string;

    //**************************************************************************

    constructor (
        private activatedRoute: ActivatedRoute,
        private _globalEventsManager: GlobalEventsManager,
        private _apiServices: ApiServices,
        private _sharedServices: SharedServices,
        private _booksServices: booksServices
    )
    {
        this.urlRoot = this._apiServices.root;

        this._booksServices.getTopBooks(this.topBooksAmount)
            .subscribe(
                response => {

                    this.topBooks = response;

                    setTimeout(function () {
                        jQuery('#top-5-books-carousel').carousel({
                            interval: 10000
                        })
                    }, 0);
                },
                err => {},
                () => {}
            );

        this.showFadeInOut('greeting');
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
    }

    //**************************************************************************

    private showFadeInOut(fadeKey: string): void
    {
        let index = 0,
            that = this,
            fadeInOut = this.fadeInOut[fadeKey];

        jQuery('.' + fadeKey).eq(index).fadeIn(fadeInOut.fadeIn);

        setInterval(function() {

            let $greetings = jQuery('.' + fadeKey);

            $greetings.not($greetings.eq(index)).hide();
            $greetings.eq(index).fadeOut(fadeInOut.fadeOut);

            index = index == that.greetings.length - 1 ? 0 : index + 1;

            $greetings.eq(index).fadeIn(fadeInOut.fadeOut);

        }, fadeInOut.interval);
    }

    //**************************************************************************

    public onBookImageClick(dataset: any): boolean
    {
        this._sharedServices.downloadBook(this._booksServices.api, dataset);

        return false;
    }

    //**************************************************************************

}
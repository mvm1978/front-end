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

        setTimeout(function () {
            jQuery('#greeting-carousel').carousel({
                interval: 8000
            });
        }, 0);
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        localStorage.removeItem('password-recovery-token');

        jQuery('li', '.navbar-nav').removeClass('active');
        jQuery('#home-menu-item').addClass('active');

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

    public onBookImageClick(dataset: any): boolean
    {
        this._sharedServices.downloadBook(this._booksServices.api, dataset);

        return false;
    }

    //**************************************************************************

}
import {Component} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {GlobalEventsManager} from '../common/modules/global-events-manager';
import {Constants} from '../common/core/constants';

import {ApiServices} from '../library/api.services';
import {SharedServices} from '../common/services/shared.services';
import {AuthServices} from '../auth/auth.services';
import {BooksServices} from '../library/book/book.services';

declare let jQuery: any;

@Component({
    selector: 'home',
    providers: [
        BooksServices
    ],
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

    private topBooksFadeIn = 2000;
    private topBooksInterval = 10000;
    private topBooksFadeOut = 2500;

    public greetings: any = [
        '',
        'Welcome to Virtual Library!',
        'You need not to authorize in order to download a book',
        'Authorization does not require email',
        'Only authorized users can upload books',
        'Only authorized users can "like" or dislike" a book',
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
        private _authServices: AuthServices,
        private _booksServices: BooksServices
    )
    {
        this.urlRoot = this._apiServices.root;
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

        this._booksServices.getTopBooks(this.topBooksAmount)
            .subscribe(
                response => {
                    this.topBooks = response;
                    this.showTop5Books();
                },
                err => {},
                () => {}
            );

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

    private showTop5Books(): void
    {
        let index = 0,
            that = this;

        jQuery('.top-books').eq(index).fadeIn(this.topBooksFadeIn);

        setInterval(function() {

            let $topBooks = jQuery('.top-books');

            $topBooks.not($topBooks.eq(index)).hide();
            $topBooks.eq(index).fadeOut(that.topBooksFadeOut);

            index = index == that.topBooks.length - 1 ? 0 : index + 1;

            $topBooks.eq(index).fadeIn(that.topBooksFadeOut);

        }, this.topBooksInterval);
    }

    //**************************************************************************

    public onTopBookImageClick($event: any): boolean
    {
        let header = this._authServices.getAuthHeader(),
            downloadName = $event.target.dataset.title + '.pdf',
            fileName = this._booksServices.api + '/download/' + $event.target.dataset.source;

        this._sharedServices.fileDownload(fileName, downloadName, header);

        return false;
    }

    //**************************************************************************

}
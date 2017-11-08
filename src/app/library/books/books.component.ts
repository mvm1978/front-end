import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {LibraryConstants} from '../library.constants';
import {AuthServices} from '../../auth/auth.services';

import {GenresServices} from '../services/genres.services';
import {BooksServices} from '../services/books.services';
import {VotesServices} from '../services/votes.services';

declare var jQuery: any;

@Component({
    selector: 'books',
    providers: [
        AuthServices,
        GenresServices,
        BooksServices,
        VotesServices
    ],
    templateUrl: LibraryConstants.BOOK_UPLOAD_PATH + 'books.component.html',
    styleUrls: [
        LibraryConstants.BOOK_UPLOAD_PATH + 'books.component.css'
    ],
})

export class BooksComponent
{
    public quizTypes: any = [];
    public quizAuthors: any = [];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _genresServices: GenresServices,
        private _booksServices: BooksServices,
        private _votesServices: VotesServices
    )
    {
        let that = this;

        this._globalEventsManager.showLoadingOverload(true);

//        this._genresServices.getGenres()
//            .subscribe(
//                response => {
//                    jQuery.each(response, function(key: string, values: any) {
//                        that.quizTypes.push(key);
//                    });
//                },
//                err => {
//                    if (err.statusText == 'Unauthorized') {
//                        this._globalEventsManager.forceSignIn();
//                    }
//                },
//                () => {}
//            );

//        this._booksServices.get()
//            .subscribe(
//                response => {
//                    this.quizAuthors = response;
//                },
//                err => {
//                    if (err.statusText == 'Unauthorized') {
//                        this._globalEventsManager.forceSignIn();
//                    }
//                },
//                () => {
//                    this._globalEventsManager.showLoadingOverload(false);
//                }
//            );
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);
    }

    //**************************************************************************

    public onSelect(id: string)
    {
        jQuery('#' + id + '-label').toggleClass('genre')
            .toggleClass('selected-genre');
    }

    //**************************************************************************

    public onSubmit()
    {
        let results = {};

        jQuery('.quiz-genres:checked').map(function() {

            let author_id = jQuery(this).attr('data-author'),
                genre_id = jQuery(this).attr('data-genre');

            if (! results.hasOwnProperty(author_id)) {
                results[author_id] = [];
            }

            results[author_id].push(genre_id);
        });

        this._globalEventsManager.showLoadingOverload(true);

//        this._votesServices.create(results)
//            .subscribe(
//                response => {
//                    window.open('/#/library/reports', '_self');
//                },
//                err => {
//                    if (err.statusText == 'Unauthorized') {
//                        this._globalEventsManager.forceSignIn();
//                    }
//                },
//                () => {
//                    this._globalEventsManager.showLoadingOverload(false);
//                }
//            );

        return false;
    }

    //**************************************************************************


}

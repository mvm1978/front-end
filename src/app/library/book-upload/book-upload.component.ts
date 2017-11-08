import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {LibraryConstants} from '../library.constants';
import {AuthServices} from '../../auth/auth.services';

import {GenresServices} from '../services/genres.services';
import {BooksServices} from '../services/books.services';

declare var jQuery: any;

@Component({
    selector: 'book-upload',
    providers: [
        AuthServices,
        GenresServices,
        BooksServices
    ],
    templateUrl: LibraryConstants.BOOK_UPLOAD_PATH + 'book-upload.component.html',
    styleUrls: [
        LibraryConstants.BOOK_UPLOAD_PATH + 'book-upload.component.css'
    ],
})

export class BookUploadComponent
{
    public genres: any = [];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _genresServices: GenresServices,
        private _booksServices: BooksServices
    )
    {
        this._globalEventsManager.showLoadingOverload(true);

        this._genresServices.getGenres()
            .subscribe(
                response => {
                    this.genres = response;
                },
                err => {
                    if (err.statusText == 'Unauthorized') {
                        this._globalEventsManager.forceSignIn();
                    }

                    this._globalEventsManager.showLoadingOverload(false);
                },
                () => {
                    this._globalEventsManager.showLoadingOverload(false);
                }
            );

    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);

        jQuery('#file').on('fileselect', function(event, numFiles, label) {
            jQuery('#book-selected').val(label);
        });
    }

    //**************************************************************************

    public onFileSelect()
    {
        let input = jQuery('#file');

        let label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

        input.trigger('fileselect', [1, label]);
    }

    //**************************************************************************

    public onSubmit()
    {
        let results = {};

//        this._globalEventsManager.showLoadingOverload(true);
//
//        this._booksServices.upload()
//            .subscribe(
//                response => {
//
//                },
//                err => {
//                    this._bookseSrvices.showError(err, 'Error book uploading');
//                    this._globalEventsManager.showLoadingOverload(false);
//
//
//                    if (err.statusText == 'Unauthorized') {
//                        this._globalEventsManager.forceSignIn();
//                    }
//
//                    this._globalEventsManager.showLoadingOverload(false);
//                },
//                () => {
//                    this._globalEventsManager.showLoadingOverload(false);
//                }
//            );

        return false;
    }

    //**************************************************************************


}

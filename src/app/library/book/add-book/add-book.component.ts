import {Component, Input, Output, EventEmitter} from '@angular/core';

import {ModalPopupComponent} from '../../../common/layouts/modal-popup/modal-popup.component';
import {GlobalEventsManager} from '../../../common/modules/global-events-manager';
import {LibraryConstants} from '../../library.constants';
import {AuthServices} from '../../../auth/auth.services';
import {BooksServices} from '../../book/book.services';

declare var jQuery: any;

@Component({
    selector: 'add-book',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    providers: [
        AuthServices,
        BooksServices
    ],
    templateUrl: LibraryConstants.BOOK_PATH + 'add-book/add-book.component.html',
    styleUrls: [
        LibraryConstants.BOOK_PATH + 'add-book/add-book.component.css'
    ],
})

export class AddBookComponent extends ModalPopupComponent
{
    @Input() addBookStatus: boolean;
    @Output() addBookStatusChange = new EventEmitter<boolean>();

    protected selector: string = 'add-book';

    public rows: any = [
        {
            id: 'book-name',
            caption: 'Book',
            placeholder: 'Book Name',
            mandatory: true
        },
        {
            id: 'description',
            caption: 'Description',
            placeholder: 'Description'
        },
        {
            id: 'upload',
            spanID: 'browse',
            inputID: 'picture-selected',
            placeHolder: 'Upload image ...',
            browse: true
        }
    ];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _booksServices: BooksServices
    )
    {
        super();
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._booksServices.checkToken();
    }

    //**************************************************************************

    public onClose()
    {
        this.addBookStatusChange.emit(false);

        return false;
    }

    //**************************************************************************

    public onSubmit()
    {
        jQuery('.row-footer').html('');
        jQuery('.row-wrapper').removeClass('has-error');

        let bookName = jQuery('#book-name').val();
        let description = jQuery('#description').val();

        if (! bookName) {

            jQuery('#book-name-footer').html('Book Name is mandatory');
            jQuery('#book-name-group').addClass('has-error');

            return false;
        }

        let formData = new FormData();

        formData.append('upload', jQuery('#upload').prop('files')[0]);
        formData.append('bookName', bookName);
        formData.append('description', description);

        this._globalEventsManager.showLoadingOverload(true);

        this._booksServices.upload(formData)
            .subscribe(
                response => {

                    this._globalEventsManager.messageBox({
                        text: jQuery('#book-name').val() + ' was added to the list of books'
                    });

                    jQuery('#book-name, #picture-selected, #upload').val('');
                },
                err => {

                    this._booksServices.showError(err, 'Error book uploading');

                    this._globalEventsManager.showLoadingOverload(false);
                },
                () => {
                    this._globalEventsManager.showLoadingOverload(false);
                }
            );

        return false;
    }

    //**************************************************************************

}
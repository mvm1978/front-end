import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {LibraryConstants} from '../library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiRoot} from '../../common/api-root';
import {AuthServices} from '../../auth/auth.services';
import {GenresServices} from '../genre/genre.services';
import {AuthorsServices} from '../author/author.services';
import {TypesServices} from '../type/type.services';
import {BooksServices} from '../book/book.services';

@Component({
    selector: 'book',
    providers: [
        AuthServices,
        GenresServices,
        AuthorsServices,
        TypesServices,
        BooksServices
    ],
    templateUrl: LibraryConstants.BOOK_PATH + 'book.component.html',
    styleUrls: [
        LibraryConstants.BOOK_PATH + 'book.component.css',
        Constants.AG_GRID_PATH + 'ag-grid.component.css'
    ]
})

export class BookComponent
{
    public showAddPopup: boolean = false;

    public addPopupInfo: any = {
        id: 'book-popup',
        title: 'Add a Book',
        successMessage: 'The book was added to the list of books',
        errorMessage: 'Error book uploading',
        method: 'upload',
        rows: []
    };

    public gridInfo: any = {
        title: 'Books',
        gridID: 'books-table',
        url: '',
        service: null,
        customFunctions: {
            rowHeight: customRowHeight
        },
        columnDefs: [
            {
                headerName: 'Genre',
                field: 'genre',
                width: 120,
                enableSorting: true,
                enableFilterfing: true,
                cellStyle: {
                    'white-space': 'normal'
                },
                cellEditor: 'select',
                cellEditorParams: {
                    dbValues: [],
                    foreignKey: 'genre_id',
                    values: []
                },
                addRow: {
                    mandatory: true
                },
                editable: true,
                pinned: true
            },
            {
                headerName: 'Author',
                field: 'author',
                width: 120,
                enableSorting: true,
                enableFilterfing: true,
                cellEditor: 'select',
                cellEditorParams: {
                    dbValues: [],
                    foreignKey: 'author_id',
                    values: []
                },
                editable: true,
                addRow: {
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Type',
                field: 'type',
                width: 110,
                enableSorting: true,
                enableFilterfing: true,
                editable: true,
                cellEditor: 'select',
                cellEditorParams: {
                    dbValues: [],
                    foreignKey: 'type_id',
                    values: []
                },
                addRow: {
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Title',
                field: 'title',
                width: 120,
                enableSorting: true,
                enableFilterfing: true,
                editable: true,
                cellEditor: 'popupText',
                cellEditorParams: {
                    maxLength: '100'
                },
                addRow: {
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 275,
                cellStyle: {
                    'white-space': 'normal'
                },
                enableSorting: true,
                enableFilterfing: true,
                editable: true,
                cellEditor: 'largeText',
                cellEditorParams: {
                    maxLength: '250',
                    cols: '50',
                    rows: '4'
                },
                addRow: {
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Length',
                field: 'length',
                width: 120,
                enableSorting: true,
                enableFilterfing: true,
                editable: true,
                cellEditor: 'popupText',
                cellEditorParams: {
                    maxLength: '10'
                },
                addRow: {
                    placeHolder: 'Book length',
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Picture',
                field: 'picture',
                width: 58,
                cellRenderer: this.pictureCellRenderer,
                rootUrl: this._apiRoot.library,
                cellEditor: 'uploader',
                addRow: {
                    placeHolder: 'Upload image ...'
                },
                pinned: true
            },
            {
                headerName: '',
                field: 'source',
                width: 60,
                customCellRenderer: 'DownloadButtonComponent',
                downloadUrl: this._apiRoot.library + '/api/library/v1/book/download/',
                cellEditor: 'uploader',
                addRow: {
                    placeHolder: 'Upload content ...'
                },
                pinned: true
            },
            {
                headerName: 'Uploaded',
                field: 'uploaded_on',
                width: 140,
                enableSorting: true,
                enableFilterfing: true,
                cellRenderer: this.uploadedOnCellRenderer,
                pinned: true
            },
            {
                headerName: '',
                field: 'upvotes',
                width: 120,
                service: BooksServices,
                enableSorting: true,
                customCellRenderer: 'UpVoteComponent',
                pinned: true
            },
            {
                headerName: '',
                field: 'downvotes',
                width: 120,
                service: BooksServices,
                enableSorting: true,
                customCellRenderer: 'DownVoteComponent',
                pinned: true
            }
        ]
    };

    //**************************************************************************

    constructor (
        private _apiRoot: ApiRoot,
        private _globalEventsManager: GlobalEventsManager,
        private _genresServices: GenresServices,
        private _authorsServices: AuthorsServices,
        private _sharedServices: SharedServices,
        private _typesServices: TypesServices,
        private _booksServices: BooksServices
    )
    {
        this.gridInfo.url = this._booksServices.api;
        this.gridInfo.service = this._booksServices;

        for (let count=0; count<this.gridInfo.columnDefs.length; count++) {
            if (~jQuery.isArray(this.gridInfo.columnDefs[count].field, ['upvotes', 'downvotes']) {
                this.gridInfo.columnDefs[count].service = this._booksServices;
            }
        }
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);

        this._booksServices.checkToken();

        this._genresServices.getDropdown()
            .subscribe(
                response => {
                    this.setCellEditor(response, 'genre')
                },
                err => {},
                () => {}
            );

        this._authorsServices.getDropdown()
            .subscribe(
                response => {
                    this.setCellEditor(response, 'author')
                },
                err => {},
                () => {}
            );

        this._typesServices.getDropdown()
            .subscribe(
                response => {
                    this.setCellEditor(response, 'type')
                },
                err => {},
                () => {}
            );
    }

    //**************************************************************************

    public setCellEditor(response: any, field: string)
    {
        for (var key in this.gridInfo.columnDefs) {
            if (this.gridInfo.columnDefs.hasOwnProperty(key)
             && this.gridInfo.columnDefs[key].field == field) {

                this.gridInfo.columnDefs[key].cellEditorParams.dbValues = response;
                this.gridInfo.columnDefs[key].cellEditorParams.values = Object.keys(response);

                return true;
            }
        }
    }

    //**************************************************************************

    public onAddBook()
    {
        this.addPopupInfo = this.addPopupInfo.length ? this.addPopupInfo :
                this._sharedServices.getAddPopupInfo(this.addPopupInfo, this.gridInfo);

        this.showAddPopup = true;
    }

    //**************************************************************************

    private pictureCellRenderer(data: any)
    {
        let url = data.colDef.rootUrl;

        return ! data.value ? '' :
            '<img class="table-picture" src="' + url + '/storage/' + data.value + '">';
    }

    //**************************************************************************

    private uploadedOnCellRenderer(data: any)
    {
        return '<div class="cell-div">' + data.value + '</div>';
    }

    //**************************************************************************

}

//******************************************************************************

function customRowHeight(data: any)
{
    return data.picture !== null && data.picture ? 80 : 60;
}

//******************************************************************************
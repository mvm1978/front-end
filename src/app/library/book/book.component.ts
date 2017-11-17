import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {LibraryConstants} from '../library.constants';
import {ApiRoot} from '../../common/api-root';
import {AuthServices} from '../../auth/auth.services';
import {GenresServices} from '../genre/genre.services';
import {AuthorsServices} from '../author/author.services';
import {BooksServices} from '../book/book.services';

@Component({
    selector: 'book',
    providers: [
        AuthServices,
        GenresServices,
        AuthorsServices,
        BooksServices
    ],
    templateUrl: LibraryConstants.BOOK_PATH + 'book.component.html',
    styleUrls: [
        LibraryConstants.BOOK_PATH + 'book.component.css'
    ],
})

export class BookComponent
{
    public showAddBook:boolean = false;

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
                cellEditor: 'select',
                cellEditorParams: {
                    dbValues: [],
                    foreignKey: 'genre_id',
                    values: []
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
                pinned: true
            },
            {
                headerName: 'Picture',
                field: 'picture',
                width: 60,
                cellRenderer: this.pictureCellRenderer,
                rootUrl: this._apiRoot.library,
                pinned: true
            },
            {
                headerName: 'Uploaded',
                field: 'uploaded_on',
                width: 140,
                enableSorting: true,
                enableFilterfing: true,
                pinned: true
            },
            {
                headerName: 'Votes',
                field: 'votes',
                width: 100,
                enableSorting: true,
                enableFilterfing: true,
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
        private _booksServices: BooksServices
    )
    {
        this.gridInfo.url = this._booksServices.api;
        this.gridInfo.service = this._booksServices;
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
        this.showAddBook = true;
    }

    //**************************************************************************

    private pictureCellRenderer(data: any)
    {
        let url = data.colDef.rootUrl;

        return ! data.value ? '' :
            '<img class="table-picture" src="' + url + '/storage/' + data.value + '">';
    }

    //**************************************************************************

}

//******************************************************************************

function customRowHeight(data: any)
{
    return data.picture !== null && data.picture ? 80 : 60;
}

//******************************************************************************

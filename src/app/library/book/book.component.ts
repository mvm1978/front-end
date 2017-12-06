import {Component, ViewChild} from '@angular/core';

import {AgGridComponent} from '../../common/layouts/ag-grid/ag-grid.component';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {LibraryConstants} from '../library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';
import {AuthServices} from '../../auth/auth.services';
import {GenresServices} from '../genre/genre.services';
import {AuthorsServices} from '../author/author.services';
import {TypesServices} from '../type/type.services';
import {BooksServices} from '../book/book.services';

declare let jQuery: any;

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
    @ViewChild(AgGridComponent) agGridComponent: AgGridComponent;

    public showAddPopup: boolean = false;

    public pieCharts: Array<any> = [];

    public addPopupInfo: any = {
        id: 'book-popup',
        title: 'Add a Book',
        successMessage: 'The book was added to the list of books',
        errorMessage: 'Error book uploading',
        method: 'upload',
        url: null,
        service: null,
        component: null,
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
                rootUrl: this._apiServices.root,
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
                downloadUrl: this._apiServices.api + '/book/download/',
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
                service: this._booksServices,
                enableSorting: true,
                customCellRenderer: 'UpVoteComponent',
                pinned: true
            },
            {
                headerName: '',
                field: 'downvotes',
                width: 120,
                service: this._booksServices,
                enableSorting: true,
                customCellRenderer: 'DownVoteComponent',
                pinned: true
            }
        ]
    };

    //**************************************************************************

    constructor (
        private _apiServices: ApiServices,
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
        this.addPopupInfo.component = this;
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);

        this._genresServices.getDropdown()
            .subscribe(
                response => {
                    this.setCellEditor(response, 'genre');
                },
                err => {},
                () => {}
            );

        this._authorsServices.getDropdown()
            .subscribe(
                response => {
                    this.setCellEditor(response, 'author');
                },
                err => {},
                () => {}
            );

        this._typesServices.getDropdown()
            .subscribe(
                response => {
                    this.setCellEditor(response, 'type');
                },
                err => {},
                () => {}
            );

        this.setChartData();
    }

    //**************************************************************************

    public setChartData(): void
    {
        this.pieCharts = [];

        this._booksServices.getCharts()
            .subscribe(
                response => {
                    for (let key in response) {
                        if (response.hasOwnProperty(key)) {
                            if (! ~jQuery.inArray(key, ['genres', 'authors'])) {
                                continue;
                            }

                            this.pieCharts.push({
                                id: key + '-chart',
                                title: 'Top 5 ' + key.charAt(0).toUpperCase() + key.slice(1),
                                data: response[key].data,
                                labels: response[key].labels
                            });
                        }
                    }
                },
                err => {},
                () => {}
            );
    }

    //**************************************************************************

    public setCellEditor(response: any, field: string): void
    {
        for (let key in this.gridInfo.columnDefs) {
            if (this.gridInfo.columnDefs.hasOwnProperty(key)
             && this.gridInfo.columnDefs[key].field == field) {

                this.gridInfo.columnDefs[key].cellEditorParams.dbValues = response;
                this.gridInfo.columnDefs[key].cellEditorParams.values = Object.keys(response);
            }
        }
    }

    //**************************************************************************

    public onAddBook(): void
    {
        this.addPopupInfo = this.addPopupInfo.length ? this.addPopupInfo :
                this._sharedServices.getAddPopupInfo(this.addPopupInfo, this.gridInfo);

        this.showAddPopup = true;
    }

    //**************************************************************************

    public onAddPopupSuccess(): void
    {
        this.agGridComponent.reload();
        this.setChartData();
    }

    //**************************************************************************

    private pictureCellRenderer(data: any): string
    {
        let url = data.colDef.rootUrl;

        return ! data.value ? '' :
            '<img class="table-picture" src="' + url + '/storage/' + data.value + '">';
    }

    //**************************************************************************

    private uploadedOnCellRenderer(data: any): string
    {
        return '<div class="cell-div">' + data.value + '</div>';
    }

    //**************************************************************************

}

//******************************************************************************

function customRowHeight(data: any): number
{
    return data.picture !== null && data.picture ? 80 : 60;
}

//******************************************************************************
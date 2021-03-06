import {Component, ViewChild} from '@angular/core';

import {AgGridComponent} from '../../common/layouts/ag-grid/ag-grid.component';

import {VirtualLibraryConstants} from '../virtual-library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';
import {AuthServices} from '../../auth/auth.services';
import {AuthorsServices} from '../author/author.services';

declare let jQuery: any;

@Component({
    selector: 'author',
    providers: [
        AuthServices,
        AuthorsServices
    ],
    templateUrl: VirtualLibraryConstants.AUTHOR_PATH + 'author.component.html',
    styleUrls: [
        VirtualLibraryConstants.AUTHOR_PATH + 'author.component.css'
    ],
})

export class AuthorComponent
{
    @ViewChild(AgGridComponent) agGridComponent: AgGridComponent;

    private api = this._apiServices.api + '/author';
    public showAddPopup: boolean = false;

    public addPopupInfo: any = {
        id: 'author-popup',
        title: 'Add an Author',
        successMessage: 'The author was added to the list of books',
        errorMessage: 'Error adding author',
        method: 'upload',
        rows: []
    };

    public gridInfo: any = {
        title: 'Authors',
        gridID: 'authors-table',
        url: '',
        service: null,
        limit: 5,
        customFunctions: {
            rowHeight: customRowHeight
        },
        columnDefs: [
            {
                headerName: 'Author',
                field: 'author',
                width: 120,
                significance: 1,
                cellStyle: {
                    'white-space': 'normal'
                },
                enableSorting: true,
                enableFilterfing: true,
                editable: true,
                cellEditor: 'popupText',
                cellEditorParams: {
                    maxLength: '100'
                },
                addRow: {
                    placeHolder: 'Author Name',
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 260,
                significance: 1,
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
                    placeHolder: 'Short Biography',
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Picture',
                field: 'picture',
                width: 60,
                significance: 2,
                cellRenderer: this.pictureCellRenderer,
                cellEditor: 'uploader',
                rootUrl: this._apiServices.root,
                addRow: {
                    placeHolder: 'Upload image ...'
                },
                pinned: true
            }
        ]
    };

    //**************************************************************************

    constructor (
        private _apiServices: ApiServices,
        private _sharedServices: SharedServices,
        private _authorsServices: AuthorsServices
    )
    {
        this.gridInfo.url = this._authorsServices.api;
        this.gridInfo.service = this._authorsServices;
        this.addPopupInfo.component = this;
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        jQuery('li', '.navbar-nav').removeClass('active');
        jQuery('#upload-menu-item').addClass('active');
    }

    //**************************************************************************

    public onAddAuthor()
    {
        this.addPopupInfo = this.addPopupInfo.length ? this.addPopupInfo :
                this._sharedServices.getAddPopupInfo(this.addPopupInfo, this.gridInfo);

        this.showAddPopup = true;
    }

    //**************************************************************************

    private pictureCellRenderer(data: any): string
    {
        let url = data.colDef.rootUrl;

        return ! data.value ? '' :
            '<img class="table-picture" src="' + url + '/storage/' + data.value + '">';
    }

    //**************************************************************************

    public downloadPDF(): boolean {

        let columnInfo: any = [];

        for (let count=0; count<this.gridInfo.columnDefs.length; count++) {

            let info = this.gridInfo.columnDefs[count];

            if (! ~jQuery.inArray(info.field, ['source'])) {
                columnInfo.push({
                    caption: info.headerName,
                    field: info.field,
                    width: info.width
                });
            }
        }

        let params = {
            columnInfo: columnInfo,
            outputSettings: this.agGridComponent.getTableSettings()
        };

        this._sharedServices.createReportPDF(params, this.api, this._authorsServices);

        return false;
    }

    //**************************************************************************

}

//******************************************************************************

function customRowHeight(data: any): number
{
    return data.picture !== null && data.picture ? 80 : 60;
}

//******************************************************************************

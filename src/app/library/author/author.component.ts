import {Component} from '@angular/core';

import {LibraryConstants} from '../library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';
import {AuthServices} from '../../auth/auth.services';
import {AuthorsServices} from '../author/author.services';

@Component({
    selector: 'author',
    providers: [
        AuthServices,
        AuthorsServices
    ],
    templateUrl: LibraryConstants.AUTHOR_PATH + 'author.component.html',
    styleUrls: [
        LibraryConstants.AUTHOR_PATH + 'author.component.css'
    ],
})

export class AuthorComponent
{
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
        customFunctions: {
            rowHeight: customRowHeight
        },
        columnDefs: [
            {
                headerName: 'Author',
                field: 'author',
                width: 120,
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
                    placeHolder: 'Short Biography',
                    mandatory: true
                },
                pinned: true
            },
            {
                headerName: 'Picture',
                field: 'picture',
                width: 60,
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
}

//******************************************************************************

function customRowHeight(data: any): number
{
    return data.picture !== null && data.picture ? 80 : 60;
}

//******************************************************************************

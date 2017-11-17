import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {LibraryConstants} from '../library.constants';
import {ApiRoot} from '../../common/api-root';
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
    public showAddAuthor:boolean = false;

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
            }
        ]
    };

    //**************************************************************************

    constructor (
        private _apiRoot: ApiRoot,
        private _globalEventsManager: GlobalEventsManager,
        private _authorsServices: AuthorsServices
    )
    {
        this.gridInfo.url = this._authorsServices.api;
        this.gridInfo.service = this._authorsServices;
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);

        this._authorsServices.checkToken();
    }

    //**************************************************************************

    public onAddAuthor()
    {
        this.showAddAuthor = true;
    }

    //**************************************************************************

    private pictureCellRenderer(data: any)
    {
        let url = data.colDef.rootUrl;

        return ! data.value ? '' :
            '<img class="table-picture" src="' + url + '/storage/' + data.value + '">';
    }
}

//******************************************************************************

function customRowHeight(data: any)
{
    return data.picture !== null && data.picture ? 80 : 60;
}

//******************************************************************************

import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {LibraryConstants} from '../library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiRoot} from '../../common/api-root';
import {AuthServices} from '../../auth/auth.services';
import {AuthorsServices} from '../author/author.services';

declare var jQuery: any;

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
                cellRenderer: authorPictureCellRenderer,
                rootUrl: this._apiRoot.library,
                pinned: true
            }
        ]
    };

    //**************************************************************************

    constructor (
        private _apiRoot: ApiRoot,
        private _globalEventsManager: GlobalEventsManager,
        private _sharedServices: SharedServices,
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

    public onSubmit()
    {
        jQuery('.row-footer').html('');
        jQuery('.row-wrapper').removeClass('has-error');

        let authorName = jQuery('#author-name').val();
        let description = jQuery('#description').val();

        if (! authorName) {

            jQuery('#author-name-footer').html('Author Name is mandatory');
            jQuery('#author-name-group').addClass('has-error');

            return false;
        }

        let formData = new FormData();

        formData.append('upload', jQuery('#upload').prop('files')[0]);
        formData.append('authorName', authorName);
        formData.append('description', description);

        this._globalEventsManager.showLoadingOverload(true);

        this._authorsServices.upload(formData)
            .subscribe(
                response => {

                    this._globalEventsManager.messageBox({
                        text: jQuery('#author-name').val() + ' was added to the list of authors'
                    });

                    jQuery('#author-name, #picture-selected, #upload').val('');
                },
                err => {

                    this._authorsServices.showError(err, 'Error author uploading');

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

//******************************************************************************

function authorPictureCellRenderer(data: any)
{
    let url = data.colDef.rootUrl;

    return ! data.value ? '' :
        '<img class="table-picture" src="' + url + '/storage/' + data.value + '">';
}

//******************************************************************************

function customRowHeight(data: any)
{
    return data.picture !== null && data.picture ? 80 : 60;
}

//******************************************************************************

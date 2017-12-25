import {Component, ViewChild} from '@angular/core';

import {AgGridComponent} from '../../common/layouts/ag-grid/ag-grid.component';

import {LibraryConstants} from '../library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';
import {AuthServices} from '../../auth/auth.services';
import {GenresServices} from '../genre/genre.services';

declare let jQuery: any;

@Component({
    selector: 'genre',
    providers: [
        AuthServices,
        GenresServices
    ],
    templateUrl: LibraryConstants.GENRE_PATH + 'genre.component.html',
    styleUrls: [
        LibraryConstants.GENRE_PATH + 'genre.component.css'
    ],
})

export class GenreComponent
{
    @ViewChild(AgGridComponent) agGridComponent: AgGridComponent;

    private api = this._apiServices.api + '/genre';
    public showAddPopup: boolean = false;

    public addPopupInfo: any = {
        id: 'genre-popup',
        title: 'Add a Genre',
        successMessage: 'The genre was added to the list of genres',
        errorMessage: 'Error adding genre',
        method: 'upload',
        rows: []
    };

    public gridInfo: any = {
        title: 'Genres',
        gridID: 'genres-table',
        url: '',
        service: null,
        limit: 10,
        columnDefs: [
            {
                headerName: 'Genre',
                field: 'genre',
                width: 200,
                cellStyle: {
                    'white-space': 'normal'
                },
                enableSorting: true,
                enableFilterfing: true,
                editable: true,
                cellEditor: 'popupText',
                cellEditorParams: {
                    maxLength: '190'
                },
                addRow: {
                    mandatory: true
                },
                pinned: true
            }
        ]
    };

    //**************************************************************************

    constructor (
        private _apiServices: ApiServices,
        private _sharedServices: SharedServices,
        private _genresServices: GenresServices
    )
    {
        this.gridInfo.url = this._genresServices.api;
        this.gridInfo.service = this._genresServices;
        this.addPopupInfo.component = this;
    }

    //**************************************************************************

    public ngOnInit()
    {
        jQuery('#main-body-backgound').css('background-image', 'url(\'/images/genres.jpg\')');
    }

    //**************************************************************************

    public ngOnDestroy()
    {
        jQuery('#main-body-backgound').css('background-image', 'url(\'/images/library.jpg\')');
    }

    //**************************************************************************

    public onAddGenre(): void
    {
        this.addPopupInfo = this.addPopupInfo.length ? this.addPopupInfo :
                this._sharedServices.getAddPopupInfo(this.addPopupInfo, this.gridInfo);

        this.showAddPopup = true;
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

        this._sharedServices.createReportPDF(params, this.api, this._genresServices);

        return false;
    }

    //**************************************************************************

}


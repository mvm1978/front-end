import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {LibraryConstants} from '../library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiRoot} from '../../common/api-root';
import {AuthServices} from '../../auth/auth.services';
import {GenresServices} from '../genre/genre.services';

declare var jQuery: any;

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
    public showAddPopup: boolean = false;

    public addPopupInfo: any = {
        id: 'genre-popup',
        title: 'Add a Genre',
        successMessage: 'The genre was added to the list of books',
        errorMessage: 'Error adding genre',
        method: 'upload',
        rows: []
    };

    public gridInfo: any = {
        title: 'Genres',
        gridID: 'genres-table',
        url: '',
        service: null,
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
        private _apiRoot: ApiRoot,
        private _globalEventsManager: GlobalEventsManager,
        private _sharedServices: SharedServices,
        private _genresServices: GenresServices
    )
    {
        this.gridInfo.url = this._genresServices.api;
        this.gridInfo.service = this._genresServices;
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);

        this._genresServices.checkToken();
    }

    //**************************************************************************

    public onAddGenre()
    {
        this.addPopupInfo = this.addPopupInfo.length ? this.addPopupInfo :
                this._sharedServices.getAddPopupInfo(this.addPopupInfo, this.gridInfo);

        this.showAddPopup = true;
    }

    //**************************************************************************

}

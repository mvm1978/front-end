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
    public showAddGenre:boolean = false;

    public gridInfo: any = {
        title: 'Genres',
        gridID: 'genres-table',
        url: '',
        service: null,
        columnDefs: [
            {
                headerName: 'Genre',
                field: 'genre',
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
        this.showAddGenre = true;
    }

    //**************************************************************************

}

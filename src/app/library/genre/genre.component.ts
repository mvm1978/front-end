import {Component} from '@angular/core';

import {LibraryConstants} from '../library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {AuthServices} from '../../auth/auth.services';
import {GenresServices} from '../genre/genre.services';

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
        private _sharedServices: SharedServices,
        private _genresServices: GenresServices
    )
    {
        this.gridInfo.url = this._genresServices.api;
        this.gridInfo.service = this._genresServices;
    }

    //**************************************************************************

    public onAddGenre(): void
    {
        this.addPopupInfo = this.addPopupInfo.length ? this.addPopupInfo :
                this._sharedServices.getAddPopupInfo(this.addPopupInfo, this.gridInfo);

        this.showAddPopup = true;
    }

    //**************************************************************************

}

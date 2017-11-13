import {Component, Input, Output, EventEmitter} from '@angular/core';

import {ModalPopupComponent} from '../../../common/layouts/modal-popup/modal-popup.component';
import {GlobalEventsManager} from '../../../common/modules/global-events-manager';
import {LibraryConstants} from '../../library.constants';
import {AuthServices} from '../../../auth/auth.services';
import {GenresServices} from '../../genre/genre.services';

declare var jQuery: any;

@Component({
    selector: 'add-genre',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    providers: [
        AuthServices,
        GenresServices
    ],
    templateUrl: LibraryConstants.GENRE_PATH + 'add-genre/add-genre.component.html',
    styleUrls: [
        LibraryConstants.GENRE_PATH + 'add-genre/add-genre.component.css'
    ],
})

export class AddGenreComponent extends ModalPopupComponent
{
    @Input() addGenreStatus: boolean;
    @Output() addGenreStatusChange = new EventEmitter<boolean>();

    protected selector: string = 'add-genre';

    public rows: any = [
        {
            id: 'genre-name',
            caption: 'Genre',
            placeholder: 'Genre Name',
            mandatory: true
        }
    ];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _genresServices: GenresServices
    )
    {
        super();
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._genresServices.checkToken();
    }

    //**************************************************************************

    public onClose()
    {
        this.addGenreStatusChange.emit(false);

        return false;
    }

    //**************************************************************************

    public onSubmit()
    {
        jQuery('.row-footer').html('');
        jQuery('.row-wrapper').removeClass('has-error');

        let genreName = jQuery('#genre-name').val();

        if (! genreName) {

            jQuery('#genre-name-footer').html('Genre Name is mandatory');
            jQuery('#genre-name-group').addClass('has-error');

            return false;
        }

        let payload = {
            genre: genreName
        };

        this._genresServices.upload(payload)
            .subscribe(
                response => {

                    this._globalEventsManager.messageBox({
                        text: jQuery('#genre-name').val() + ' was added to the list of genres'
                    });

                    jQuery('#genre-name').val('');
                },
                err => {

                    this._genresServices.showError(err, 'Error genre uploading');

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
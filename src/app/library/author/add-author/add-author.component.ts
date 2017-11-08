import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';
import {LibraryConstants} from '../../library.constants';
import {AuthServices} from '../../../auth/auth.services';
import {AuthorsServices} from '../../services/author.services';

declare var jQuery: any;

@Component({
    selector: 'add-author',
    providers: [
        AuthServices,
        AuthorsServices
    ],
    templateUrl: LibraryConstants.AUTHOR_PATH + 'add-author/add-author.component.html',
    styleUrls: [
        LibraryConstants.AUTHOR_PATH + 'add-author/add-author.component.css'
    ],
})

export class AddAuthorComponent
{
    public rows: any = [
        {
            id: 'author-name',
            caption: 'Author',
            placeholder: 'Author Name',
            mandatory: true
        },
        {
            id: 'description',
            caption: 'Description',
            placeholder: 'Description'
        },
        {
            id: 'upload',
            spanID: 'browse',
            inputID: 'picture-selected',
            placeHolder: 'Upload image ...',
            browse: true
        }
    ];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _authorsServices: AuthorsServices
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._authorsServices.checkToken();
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
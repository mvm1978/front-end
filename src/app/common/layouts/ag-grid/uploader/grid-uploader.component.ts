import {Component, Input} from '@angular/core';

import {ModalPopupComponent} from '../../../layouts/modal-popup/modal-popup.component';
import {SharedServices} from '../../../services/shared.services';
import {InlineInputRowInputGroupComponent} from '../../row-input-group/inline-input/inline-input-row-input-group.component';

import {AgGridServices} from '../ag-grid.services';

import {Constants} from '../../../core/constants';

declare let jQuery: any;

@Component({
    selector: 'grid-uploader',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    providers: [
        InlineInputRowInputGroupComponent
    ],
    templateUrl: Constants.AG_GRID_UPLOADER + 'grid-uploader.component.html',
    styleUrls: [
        Constants.AG_GRID_UPLOADER + 'grid-uploader.component.css'
    ]
})

export class GridUploaderComponent extends ModalPopupComponent
{
    @Input() gridData: any;
    @Input() info: any;

    public data: any = {
        id: 'upload',
        spanID: 'uploader',
        inputID: 'picture-selected',
        placeHolder: 'Upload image ...',
        mandatory: true
    };

    //**************************************************************************

    constructor(
        private _sharedServices: SharedServices,
        private _agGridServices: AgGridServices
    )
    {
        super();
    }

    //**************************************************************************

    public handleClick($event: any): void
    {
        if (! $event.x && ! $event.y) {
            return;
        }

        let $content = jQuery('#grid-uploader-popup-content');

        if (this._sharedServices.checkIfOuterClick($event.x, $event.y, $content)) {
            this._agGridServices.showUploader({});
        }
    }

    //**************************************************************************

    public ngAfterViewInit()
    {
        this.status = 'Opened';
    }

    //**************************************************************************

    public onClose(): boolean
    {
        // hide uploader popups
        this._agGridServices.showUploader({});

        return false;
    }

    //**************************************************************************

    public onSubmit(): boolean
    {
        jQuery('.row-footer').html('');
        jQuery('.row-wrapper').removeClass('has-error');

        let file = jQuery('#upload').prop('files')[0];

        if (typeof file === 'undefined') {

            jQuery('#upload-footer').html('Specify upload filename');

            return false;
        }

        let formData = new FormData();

        formData.append('upload', file);

        this.gridData.service.patch(this.info.field, this.info.id, formData)
            .subscribe(
                response => {
                    this._agGridServices.showUploader({});
                    this._agGridServices.reloadTable();
                },
                err => {
                    this._agGridServices.showUploaderError(err, 'Error uploading file');
                },
                () => {}
            );

        return false;
    }

    //**************************************************************************

}
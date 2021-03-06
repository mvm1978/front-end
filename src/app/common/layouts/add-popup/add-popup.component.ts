import {Component, Input, Output, EventEmitter} from '@angular/core';

import {ModalPopupComponent} from '../../layouts/modal-popup/modal-popup.component';
import {SharedServices} from '../../services/shared.services';
import {GlobalEventsManager} from '../../modules/global-events-manager';
import {Constants} from '../../core/constants';

declare let jQuery: any;

@Component({
    selector: 'add-popup',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: Constants.ADD_POPUP_PATH + 'add-popup.component.html',
    styleUrls: [
        Constants.ADD_POPUP_PATH + 'add-popup.component.css'
    ],
})

export class AddPopupComponent extends ModalPopupComponent
{
    @Input() addPopupInfo: any;
    @Input() addPopupStatus: boolean;
    @Output() addPopupStatusChange = new EventEmitter<boolean>();

    protected selector: string = 'add-popup';
    private initPopup: boolean = false;

    //**************************************************************************

    constructor (
        private _sharedServices: SharedServices,
        private _globalEventsManager: GlobalEventsManager
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

        if (this.initPopup) {
            this.initPopup = false;
        } else {

            let $content = jQuery('#' + this.addPopupInfo.id + '-popup-content');

            if (this._sharedServices.checkIfOuterClick($event.x, $event.y, $content)) {
                this.addPopupStatusChange.emit(false);
            }
        }
    }

    //**************************************************************************

    public ngAfterViewInit()
    {
        this.initPopup = true;
    }

    //**************************************************************************

    public onClose(): boolean
    {
        this.addPopupStatusChange.emit(false);

        return false;
    }

    //**************************************************************************

    public onSubmit(): boolean
    {
        let $parent = jQuery('#' + this.addPopupInfo.id);

        jQuery('.row-footer', $parent).html('');
        jQuery('.row-wrapper', $parent).removeClass('has-error');

        let isError = false,
            formData = new FormData();

        for (let key in this.addPopupInfo.rows) {
            if (this.addPopupInfo.rows.hasOwnProperty(key)) {

                let row = this.addPopupInfo.rows[key],
                    value = null;

                let id = row.id;

                if (row.hasOwnProperty('dropdown')) {
                    value = jQuery('#' + id + ' option:selected', $parent).val();
                } else if (row.hasOwnProperty('uploader')) {
                    if (jQuery('#' + id).val()) {
                        value = jQuery('#' + id).prop('files')[0];
                    }
                } else {
                    value = jQuery('#' + id).val();
                }

                if (row.hasOwnProperty('mandatory') && row.mandatory
                 && ! row.hasOwnProperty('dropdown') && ! value) {

                    jQuery('#' + id + '-footer', $parent).html(row.caption + ' is mandatory');
                    jQuery('#' + id + '-group', $parent).addClass('has-error');

                    isError = true;
                }

                if (value != null) {
                    formData.append(id, value);
                }
            }
        }

        if (isError) {
            return false;
        }

        this._globalEventsManager.showLoadingOverload(true);

        let service = this.addPopupInfo.service,
            component = this.addPopupInfo.component;

        service[this.addPopupInfo.method](formData)
            .subscribe(
                response => {

                    jQuery('.form-control', $parent).val('');
                    jQuery('.row-footer', $parent).html('');
                    jQuery('.row-wrapper', $parent).removeClass('has-error');

                    this._globalEventsManager.messageBox({
                        text: this.addPopupInfo.successMessage
                    });

                    if (component.onAddPopupSuccess != null) {
                        component.onAddPopupSuccess();
                    }
                },
                err => {

                    service.showError({
                        err: err,
                        defaultMessage: this.addPopupInfo.errorMessage,
                        output: this.addPopupInfo.id
                    });

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
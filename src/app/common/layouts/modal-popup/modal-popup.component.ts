import {Component} from '@angular/core';

import {Constants} from '../../../common/core/constants';

declare var jQuery: any;

@Component({
    selector: 'modal-popup',
    template: Constants.MODAL_POPUP_PATH + 'modal-popup.component.html',
    styleUrls: [
        Constants.MODAL_POPUP_PATH + 'modal-popup.component.css'
    ]
})

export class ModalPopupComponent
{
    private isReady: boolean;

    constructor ()
    {
    }

    //**************************************************************************

    private handleClick($event)
    {
        if (! this.isReady) {

            this.isReady = true;

            return false;
        }

        let $content = jQuery('add-author .popup-content');

        let offset = $content.offset(),
            x = $event.x,
            y = $event.y;

        let minX = offset.left,
            minY = offset.top;

        let maxX = minX + $content.outerWidth(),
            maxY = minY + $content.outerHeight();

        if (x < minX || x > maxX || y < minY || y > maxY) {
            this.onClose(); // require this method in child component
        }
    }

    //**************************************************************************

    public onClose()
    {
        // abstract method: need to be implemented in child component
    }

    //**************************************************************************

}
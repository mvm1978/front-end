import {Component} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'modal-popup',
    template: ``
})

export class ModalPopupComponent
{
    protected selector: string;
    private isReady: boolean;

    constructor ()
    {
    }

    //**************************************************************************

    public handleClick($event: any)
    {
        if (! this.isReady) {

            this.isReady = true;

            return false;
        }

        let $content = jQuery(this.selector + ' .popup-content');

        if (! $content.length) {
            return false;
        }

        let offset = $content.offset(),
            x = $event.x,
            y = $event.y;

        let minX = offset.left,
            minY = offset.top;

        let maxX = minX + $content.outerWidth(),
            maxY = minY + $content.outerHeight();

        if (x < minX || x > maxX || y < minY || y > maxY) {

            this.isReady = false;

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
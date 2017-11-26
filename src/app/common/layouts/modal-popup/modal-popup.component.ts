import {Component} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'modal-popup',
    template: ``
})

export class ModalPopupComponent
{
    protected status: string = '';

    constructor ()
    {
    }

    //**************************************************************************

    public ngAfterViewInit()
    {
        this.status = 'Init';
    }

    //**************************************************************************

    public handleClick($event: any): void
    {
//        if (this.status == 'Init') {
//            this.status = 'Opened';
//        } else if (this.status == 'Opened') {
//
//            let $content = jQuery('.popup-content');
//
//            if (! $content.length) {
//                return true;
//            }
//
//            let offset = $content.offset(),
//                x = $event.x,
//                y = $event.y;
//
//            let minX = offset.left,
//                minY = offset.top;
//
//            let maxX = minX + $content.outerWidth(),
//                maxY = minY + $content.outerHeight();
//
//            if (x < minX || x > maxX || y < minY || y > maxY) {
//                this.onClose(); // require this method in child component
//            }
//        }
    }

    //**************************************************************************

    public onClose(): void
    {
        // abstract method: need to be implemented in child component
    }

    //**************************************************************************

}
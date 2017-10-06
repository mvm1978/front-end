import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

@Component({
    selector: 'footer',
    templateUrl: './app/common/layouts/footer/footer.component.html',
    styleUrls: [
        './app/common/layouts/footer/footer.component.css'
    ]
})

export class FooterComponent
{
    public isFooter: boolean = false;

    constructor (
        private _globalEventsManager: GlobalEventsManager
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showFooterEmitter
            .subscribe((isFooter) => {
                this.isFooter = isFooter;
            }
        );
    }

    //**************************************************************************

}

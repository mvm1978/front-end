import {Component, Injectable} from '@angular/core';
import {GlobalEventsManager} from './common/modules/global-events-manager';

@Component({
    selector: 'main-app',
    templateUrl: './app/app.component.html'
})

@Injectable()

export class AppComponent
{
    public isLoadingOverlay: boolean = true;
    public isHeader: boolean = true;
    public isFooter: boolean = true;

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager
    )
    {
        this._globalEventsManager.showHeaderEmitter
            .subscribe((isHeader) => {
                this.isHeader = isHeader;
            }
        );

        this._globalEventsManager.showFooterEmitter
            .subscribe((isFooter) => {
                this.isFooter = isFooter;
            }
        );

        this._globalEventsManager.showLoadingOverlayEmitter
            .subscribe((isLoadingOverlay) => {
                this.isLoadingOverlay = isLoadingOverlay;
            }
        );

        this.isLoadingOverlay = false;
    }

    //**************************************************************************

}
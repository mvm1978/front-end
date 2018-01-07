import {Component, Injectable} from '@angular/core';
import {GlobalEventsManager} from './common/modules/global-events-manager';

declare let jQuery: any;

@Component({
    selector: 'main-app',
    templateUrl: './app/app.component.html'
})

@Injectable()

export class AppComponent
{
    public isLoadingOverlay: boolean = false;

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager
    )
    {
        jQuery('#main-body-wait').remove();
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this._globalEventsManager.showLoadingOverlayEmitter
            .subscribe((isLoadingOverlay) => {
                this.isLoadingOverlay = isLoadingOverlay;
            }
        );
    }

    //**************************************************************************

}
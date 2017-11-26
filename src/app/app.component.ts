import {Component, Injectable} from '@angular/core';
import {GlobalEventsManager} from './common/modules/global-events-manager';

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
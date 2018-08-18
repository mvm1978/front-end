import {Component, Injectable, HostListener} from '@angular/core';
import {GlobalEventsManager} from './common/modules/global-events-manager';

import {Constants} from './common/core/constants';

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

    @HostListener("window:scroll", [])
    onWindowScroll(): void
    {
        if (jQuery(window).innerWidth() > Constants.BOOTSTRAP_MOBILE_WINDOW_MAX_WIDTH) {
            if (jQuery(window).scrollTop()) {
                jQuery('.caption').hide(100);
                jQuery('#site-caption').hide();
                jQuery('#main-navbar').height('30px');
                jQuery('#main-header a').addClass('small-icon');
            } else {
                jQuery('.caption').show(100);
                jQuery('#site-caption').show();
                jQuery('#main-navbar').height('50px');
                jQuery('#main-header a').removeClass('small-icon');
            }
        }
    }

    //**************************************************************************

}
import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {SharedService} from '../../common/modules/shared.service';
import {mvmConstants} from '../mvm.constants';


import {WelcomeModule} from './welcome.module';

declare var jQuery: any;

@Component({
    selector: 'welcome',
    templateUrl: mvmConstants.WELCOME_PATH + 'welcome.component.html',
    providers: [
        WelcomeModule
    ],
    styleUrls: [
        mvmConstants.WELCOME_PATH + 'welcome.component.css'
    ],
})

export class WelcomeComponent
{

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager,
        protected _sharedService: SharedService
    )
    {
        this._sharedService.set('app', mvmConstants.APP);
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);
    }

    //**************************************************************************



    //**************************************************************************

}

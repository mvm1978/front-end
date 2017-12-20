import {Component} from '@angular/core';

import {AuthServices} from '../../../auth/auth.services';

@Component({
    selector: 'main-body',
    templateUrl: './app/common/layouts/main-body/main-body.component.html',
    styleUrls: [
        './app/common/layouts/main-body/main-body.component.css'
    ]
})

export class MainBodyComponent
{
    //**************************************************************************

    constructor (
        private _authServices: AuthServices
    )
    {
        let forceSingIn = false;

        this._authServices.checkToken(forceSingIn);
    }

    //**************************************************************************

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CopyRightComponent} from '../layouts/copy-right/copy-right.component';
import {PageNotFoundComponent} from '../layouts/page-not-found/page-not-found.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CopyRightComponent,
        PageNotFoundComponent
    ],
    exports: [
        CopyRightComponent,
        PageNotFoundComponent
    ]
})

export class SharedModule {}
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RichGridModule} from '../layouts/ag-grid/ag-grid.module';

import {PageNotFoundComponent} from '../layouts/page-not-found/page-not-found.component';
import {InlineInputRowInputGroupComponent} from '../layouts/row-input-group/inline-input/inline-input-row-input-group.component';
import {InlineBrowseRowInputGroupComponent} from '../layouts/row-input-group/inline-browse/inline-browse-row-input-group.component';

@NgModule({
    imports: [
        CommonModule,
        RichGridModule,
    ],
    declarations: [
        PageNotFoundComponent,
        InlineInputRowInputGroupComponent,
        InlineBrowseRowInputGroupComponent
    ],
    exports: [
        RichGridModule,
        PageNotFoundComponent,
        InlineInputRowInputGroupComponent,
        InlineBrowseRowInputGroupComponent
    ]
})

export class SharedModule {}
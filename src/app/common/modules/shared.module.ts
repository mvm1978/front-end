import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InlineDropdownRowInputGroupComponent} from '../layouts/row-input-group/inline-dropdown/inline-dropdown-row-input-group.component';
import {InlineInputRowInputGroupComponent} from '../layouts/row-input-group/inline-input/inline-input-row-input-group.component';
import {InlineUploaderRowInputGroupComponent} from '../layouts/row-input-group/inline-uploader/inline-uploader-row-input-group.component';
import {AddPopupComponent} from '../layouts/add-popup/add-popup.component';
import {SearchComponent} from '../../common/layouts/search/search.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InlineDropdownRowInputGroupComponent,
        InlineInputRowInputGroupComponent,
        InlineUploaderRowInputGroupComponent,
        SearchComponent,
        AddPopupComponent
    ],
    exports: [
        CommonModule,
        InlineDropdownRowInputGroupComponent,
        InlineInputRowInputGroupComponent,
        InlineUploaderRowInputGroupComponent,
        SearchComponent,
        AddPopupComponent
    ]
})

export class SharedModule {}
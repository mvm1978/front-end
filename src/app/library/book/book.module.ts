import {NgModule} from '@angular/core';

import {RichGridModule} from '../../common/layouts/ag-grid/ag-grid.module';
import {SharedModule} from '../../common/modules/shared.module';

import {BookComponent} from './book.component';

@NgModule({
    imports: [
        SharedModule,
        RichGridModule
    ],
    declarations: [
        BookComponent
    ],
    exports: [
        SharedModule,
        RichGridModule,
        BookComponent
    ]
})

export class BookModule {}
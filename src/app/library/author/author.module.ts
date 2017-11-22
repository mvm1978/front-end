import {NgModule} from '@angular/core';

import {RichGridModule} from '../../common/layouts/ag-grid/ag-grid.module';
import {SharedModule} from '../../common/modules/shared.module';

import {AuthorComponent} from './author.component';

@NgModule({
    imports: [
        SharedModule,
        RichGridModule
    ],
    declarations: [
        AuthorComponent
    ],
    exports: [
        SharedModule,
        RichGridModule,
        AuthorComponent
    ]
})

export class AuthorModule {}
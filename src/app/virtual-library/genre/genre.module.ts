import {NgModule} from '@angular/core';

import {RichGridModule} from '../../common/layouts/ag-grid/ag-grid.module';
import {SharedModule} from '../../common/modules/shared.module';

import {GenreComponent} from './genre.component';

@NgModule({
    imports: [
        SharedModule,
        RichGridModule
    ],
    declarations: [
        GenreComponent
    ],
    exports: [
        SharedModule,
        RichGridModule,
        GenreComponent
    ]
})

export class GenreModule {}
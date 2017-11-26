import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';

import {RichGridModule} from '../../common/layouts/ag-grid/ag-grid.module';
import {SharedModule} from '../../common/modules/shared.module';

import {PieChartComponent} from '../../common/layouts/charts/pie/pie-chart.component';

import {BookComponent} from './book.component';

@NgModule({
    imports: [
        ChartsModule,
        SharedModule,
        RichGridModule
    ],
    declarations: [
        PieChartComponent,
        BookComponent
    ],
    exports: [
        ChartsModule,
        SharedModule,
        RichGridModule,
        PieChartComponent,
        BookComponent
    ]
})

export class BookModule {}
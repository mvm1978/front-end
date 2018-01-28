import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';

import {RichGridModule} from '../../common/layouts/ag-grid/ag-grid.module';
import {SharedModule} from '../../common/modules/shared.module';

import {BarChartComponent} from '../../common/layouts/charts/bar/bar-chart.component';
import {PieChartComponent} from '../../common/layouts/charts/pie/pie-chart.component';

import {BookComponent} from './book.component';

@NgModule({
    imports: [
        ChartsModule,
        SharedModule,
        RichGridModule
    ],
    declarations: [
        BarChartComponent,
        PieChartComponent,
        BookComponent
    ],
    exports: [
        ChartsModule,
        SharedModule,
        RichGridModule,
        BarChartComponent,
        PieChartComponent,
        BookComponent
    ]
})

export class BookModule {}
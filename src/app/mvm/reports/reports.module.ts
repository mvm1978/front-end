import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartsModule} from 'ng2-charts';

import {ReportsComponent} from './reports.component';
import {PieChartComponent} from './charts/pie/pie-chart.component';

@NgModule({
    imports: [
        ChartsModule,
        CommonModule
    ],
    declarations: [
        ReportsComponent,
        PieChartComponent
    ]
})

export class ReportsModule {}
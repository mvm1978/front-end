import {Component, Input} from '@angular/core';

import {Constants} from '../../../core/constants';

@Component({
    selector: 'bar-chart',
    templateUrl: Constants.CHART_PATH + 'bar/bar-chart.component.html',
    styleUrls: [
        Constants.CHART_PATH + 'bar/bar-chart.component.css'
    ],
})

export class BarChartComponent
{
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    @Input() barChartLabels: string[];
    @Input() barChartData: number[];

    //**************************************************************************

    constructor ()
    {
    }

    //**************************************************************************

}

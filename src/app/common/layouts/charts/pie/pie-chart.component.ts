import {Component, Input} from '@angular/core';

import {Constants} from '../../../core/constants';

@Component({
    selector: 'pie-chart',
    templateUrl: Constants.CHART_PATH + 'pie/pie-chart.component.html',
    styleUrls: [
        Constants.CHART_PATH + 'pie/pie-chart.component.css'
    ],
})

export class PieChartComponent
{
    @Input() pieChartLabels: string[];
    @Input() pieChartData: number[];
    public pieChartType: string = 'pie';

    //**************************************************************************

    constructor ()
    {
    }

    //**************************************************************************

}

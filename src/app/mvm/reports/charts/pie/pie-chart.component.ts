import {Component, Input} from '@angular/core';

import {mvmConstants} from '../../../mvm.constants';

@Component({
    selector: 'pie-chart',
    providers: [
    ],
    templateUrl: mvmConstants.REPORTS_PATH + 'charts/pie/pie-chart.component.html',
    styleUrls: [
        mvmConstants.REPORTS_PATH + 'charts/pie/pie-chart.component.css'
    ],
})

export class PieChartComponent
{
    @Input() pieChartLabels: string[] = ['', '', '', ''];
    @Input() pieChartData: number[] = [0, 0, 0, 0];
    public pieChartType: string = 'pie';

    //**************************************************************************

    constructor ()
    {
    }

    //**************************************************************************

}

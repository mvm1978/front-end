import {Component, Input} from '@angular/core';

import {LibraryConstants} from '../../../library.constants';

@Component({
    selector: 'pie-chart',
    providers: [
    ],
    templateUrl: LibraryConstants.REPORTS_PATH + 'charts/pie/pie-chart.component.html',
    styleUrls: [
        LibraryConstants.REPORTS_PATH + 'charts/pie/pie-chart.component.css'
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

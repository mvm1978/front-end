import {Component, Input} from '@angular/core';

import {AgGridServices} from '../ag-grid/ag-grid.services';

import {Constants} from '../../core/constants';

@Component({
    selector: 'ag-grid',
    templateUrl: Constants.AG_GRID_PATH + 'ag-grid.component.html',
    styleUrls: [
        Constants.AG_GRID_PATH + 'ag-grid.component.css'
    ]
})

export class AgGridComponent
{
    @Input() data: any;

    public filterField: string;

    private showFilterSubscription: any = null;

    constructor(
        private _agGridServices: AgGridServices
    )
    {
    }

    //**************************************************************************

    private ngOnInit()
    {
        this._agGridServices.set('gridID', this.data.gridID);
        this.showFilterSubscription = this._agGridServices.showFilterEmitter
            .subscribe((data: any) => {
                this._agGridServices.set('filterColumn', data.caption);
                this.filterField = data.field;
            }
        );
    }

    //**************************************************************************

    private ngOnDestroy()
    {
        this.showFilterSubscription.unsubscribe();
    }

    //**************************************************************************

}
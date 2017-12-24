import {Component, Input, ViewChild} from '@angular/core';

import {GridComponent} from '../ag-grid/grid/grid.component';

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
    @ViewChild(GridComponent) gridComponent: GridComponent;
    @Input() data: any;

    public filterField: string;
    public uploaderInfo: any = {
        field: '',
        id: 0
    };

    private showFilterSubscription: any = null;
    private showUploaderSubscription: any = null;

    constructor(
        private _agGridServices: AgGridServices
    )
    {
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this._agGridServices.set('gridID', this.data.gridID);

        this.showFilterSubscription = this._agGridServices.showFilterEmitter
            .subscribe((data: any) => {
                this._agGridServices.set('filterColumn', data.caption);
                this.filterField = data.field;
            }
        );

        this.showUploaderSubscription = this._agGridServices.showUploaderEmitter
            .subscribe((data: any) => {
                this._agGridServices.set('uploaderColumn', data.caption);
                this.uploaderInfo = data;
            }
        );
    }

    //**************************************************************************

    private ngOnDestroy(): void
    {
        this.showFilterSubscription.unsubscribe();
        this.showUploaderSubscription.unsubscribe();
    }

    //**************************************************************************

    public reload(): void
    {
        this.gridComponent.reload();
    }

    //**************************************************************************

    public getTableSettings(): any
    {
        return this._agGridServices.get('output');
    }

    //**************************************************************************

}
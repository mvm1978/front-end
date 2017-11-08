import {Component} from '@angular/core';
import {IHeaderParams} from 'ag-grid/main';
import {IHeaderAngularComp} from 'ag-grid-angular/main';

import {AgGridServices} from '../ag-grid.services';

import {Constants} from '../../../core/constants';

@Component({
    templateUrl: Constants.AG_GRID_HEADER + 'grid-header.component.html',
    styleUrls: [
        Constants.AG_GRID_HEADER + 'grid-header.component.css'
    ]
})

export class GridHeaderComponent implements IHeaderAngularComp
{
    public params: IHeaderParams;
    public sorted: string;
    public columnInfo: any;

    private field: string;
    private caption: string;

    //**************************************************************************

    constructor(
        private _agGridServices: AgGridServices
    ) {

    }

    //**************************************************************************

    public agInit(params: IHeaderParams): void
    {
        this.params = params;

        this.columnInfo = params.column['colDef'];

        this.field = this.columnInfo.field;
        this.caption = this.columnInfo.headerName;
    }

    public onMenuClick()
    {
console.log('onMenuClick');
    }

    //**************************************************************************

    public onSortRequested(order: string): void
    {
        this.sorted = order;

        if (order) {
            this._agGridServices.outputUpdate({sort: this.field}, order);
        } else {
            this._agGridServices.outputUpdate({sort: this.field});
        }

        this._agGridServices.reloadTable();
    }

    //**************************************************************************

    public onFilterRequested(): void
    {
        this._agGridServices.set('filterField', this.field);
        this._agGridServices.showFilter({
            field: this.field,
            caption: this.caption
        });
    }

    //**************************************************************************

    public onFilterRemove(): void
    {
        this._agGridServices.outputUpdate({filter: this.field});
        this._agGridServices.reloadTable();
    }

    //**************************************************************************

}
import {Component, Input} from '@angular/core';

import {InlineInputRowInputGroupComponent} from '../../row-input-group/inline-input/inline-input-row-input-group.component';

import {AgGridServices} from '../ag-grid.services';

import {Constants} from '../../../core/constants';

declare var jQuery: any;

@Component({
    selector: 'grid-filter',
    providers: [
        InlineInputRowInputGroupComponent
    ],
    templateUrl: Constants.AG_GRID_FILTER + 'grid-filter.component.html',
    styleUrls: [
        Constants.AG_GRID_FILTER + 'grid-filter.component.css'
    ]
})

export class GridFilterComponent
{
    @Input() gridID: string;

    public rows: any = [
        {
            id: 'equals-to',
            caption: 'Equals to'
        },
        {
            id: 'contains',
            caption: 'Contains'
        },
        {
            id: 'starts-with',
            caption: 'Starts with'
        },
        {
            id: 'ends-with',
            caption: 'Ends with'
        }
    ];

    //**************************************************************************

    constructor(
        private _agGridServices: AgGridServices
    )
    {

    }

    //**************************************************************************

    public onClose()
    {
        // hide filter popups
        this._agGridServices.showFilter('');

        return false;
    }

    //**************************************************************************

    public onSubmit()
    {
        // hide filter popups
        this._agGridServices.showFilter('');

        let params: any = {};

        for (let count=0; count<this.rows.length; count++) {

            let id = this.rows[count].id;

            let value = jQuery('#' + id).val();

            if (value) {

                let operator = jQuery('#' + id + '-operator').val();

                params[count] = {
                    condition: id,
                    value: value,
                    operator: operator ? operator : null
                };
            }
        }

        let filterField = this._agGridServices.get('filterField');

        if (jQuery.isEmptyObject(params)) {
            this._agGridServices.outputUpdate({filter: filterField});
        } else {
            this._agGridServices.outputUpdate({filter: filterField}, params);
        }

        this._agGridServices.reloadTable();

        return false;
    }

    //**************************************************************************
}
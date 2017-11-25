import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';

import {AuthServices} from '../../../../auth/auth.services';
import {SharedServices} from '../../../services/shared.services';

import {Constants} from '../../../core/constants';

@Component({
    selector: 'vote',
    template: ''
})

export class VoteComponent implements ICellRendererAngularComp
{
    public params: any;
    public count: any;

    constructor(
        private _authServices: AuthServices,
        private _sharedServices: SharedServices
    ) {

    }

    //**************************************************************************

    public agInit(params: any): void
    {
        this.params = params;

        this.count = this._sharedServices.getCount(params.value);
    }

    //**************************************************************************

    public onClick($event, vote: string): void
    {
        let payload = {
            vote: vote
        };

        this.params.colDef.service.vote(this.params.data.id, payload)
            .subscribe(
                response => {

                    let field = this.params.colDef.field,
                        antiField = this.params.colDef.field == 'upvotes' ?
                            'downvotes' : 'upvotes';

                    this.params.data[field] = response[field];
                    this.params.data[antiField] = response[antiField];
                    this.params.value = response[field];
                    this.count = this._sharedServices.getCount(response[field]);

                    let $grid = jQuery('.' + field).closest('div.ag-body'),
                        index = this.params.node.rowIndex;

                    let that = this;

                    ['downvotes', 'upvotes'].forEach(function(field) {

                        let displayValue = that._sharedServices.getCount(response[field]);

                        jQuery('.' + field, $grid).eq(index)
                            .attr('title', response[field])
                            .html(displayValue);
                    });
                },
                err => {},
                () => {}
            );

        return false;
    }

    //**************************************************************************

    public refresh(): boolean
    {
        return false;
    }

    //**************************************************************************

}
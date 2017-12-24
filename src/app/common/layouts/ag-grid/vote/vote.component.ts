import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';

import {GlobalEventsManager} from '../../../modules/global-events-manager';
import {SharedServices} from '../../../services/shared.services';

declare let jQuery: any;

@Component({
    selector: 'vote',
    template: ''
})

export class VoteComponent implements ICellRendererAngularComp
{
    public params: any;
    public count: any;

    constructor(
        private _globalEventsManager: GlobalEventsManager,
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

    public onClick(vote: string): boolean
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
                err => {
                    if (err.status == 401) {
                        this._globalEventsManager.messageBox({
                            text: 'Unauthorized access. Please sign up'
                        });
                    }
                },
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
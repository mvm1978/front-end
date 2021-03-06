import {Component, Input} from '@angular/core';

import {Utils} from '../../core/utils';
import {GlobalEventsManager} from '../../modules/global-events-manager';

declare let jQuery: any;

@Component({
    selector: 'vote',
    template: ''
})

export class VoteComponent
{
    @Input() container: any;
    @Input() service: any;
    @Input() params: any;

    public count: any;

    constructor(
        private _globalEventsManager: GlobalEventsManager
    ) {
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this.count = Utils.getFormattedRating(this.params.value);
    }

    //**************************************************************************

    public onClick(vote: string): boolean
    {
        let payload = {
            vote: vote
        };

        this.service.vote(this.params.data.id, payload)
            .subscribe(
                response => {

                    let field = this.params.field,
                        antiField = this.params.field == 'upvotes' ?
                            'downvotes' : 'upvotes';

                    this.params.data[field] = response[field];
                    this.params.data[antiField] = response[antiField];
                    this.params.value = response[field];

                    let $container = jQuery(this.container),
                        index = this.params.index;

                    ['downvotes', 'upvotes'].forEach(function(field) {

                        let displayValue = Utils.getFormattedRating(response[field]);

                        jQuery('.' + field, $container).eq(index)
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

}
import {Component, Input} from '@angular/core';

import {VirtualLibraryConstants} from '../../virtual-library.constants';

@Component({
    selector: 'book-vote',
    templateUrl: VirtualLibraryConstants.LIBRARY_PATH + 'book-vote/book-vote.component.html',
    styleUrls: [
        VirtualLibraryConstants.LIBRARY_PATH + 'book-vote/book-vote.component.css'
    ],
})

export class BookVoteComponent
{
    @Input() container: any;
    @Input() service: any;
    @Input() upVoteInfo: any;
    @Input() downVoteInfo: any;

    //**************************************************************************

    constructor ()
    {
    }

    //**************************************************************************

}
import {Component, Input} from '@angular/core';

import {VirtualLibraryConstants} from '../../virtual-library.constants';

@Component({
    selector: 'book-definition',
    templateUrl: VirtualLibraryConstants.LIBRARY_PATH + 'book-definition/book-definition.component.html',
    styleUrls: [
        VirtualLibraryConstants.LIBRARY_PATH + 'book-definition/book-definition.component.css'
    ],
})

export class BookDefinitionComponent
{
    @Input() book: any;

    //**************************************************************************

    constructor ()
    {
    }

    //**************************************************************************

}
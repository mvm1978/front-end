import {Component, ViewChild} from '@angular/core';

import {Observable} from 'rxjs/Rx';

import {VirtualLibraryConstants} from '../virtual-library.constants';
import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';
import {AuthServices} from '../../auth/auth.services';
import {LlibraryServices} from '../library/library.services';
import {GenresServices} from '../genre/genre.services';
import {AuthorsServices} from '../author/author.services';
import {TypesServices} from '../type/type.services';
import {booksServices} from '../book/book.services';

declare let jQuery: any;

@Component({
    selector: 'library',
    providers: [
        AuthServices,
        LlibraryServices,
        GenresServices,
        AuthorsServices,
        TypesServices,
        booksServices
    ],
    templateUrl: VirtualLibraryConstants.LIBRARY_PATH + 'library.component.html',
    styleUrls: [
        VirtualLibraryConstants.LIBRARY_PATH + 'library.component.css'
    ],
})

export class LibraryComponent
{
    private api = this._apiServices.api + '/library';

    public filter: any = {
        limit: 0
    };
    public sidePanels: any = [];
    public books: any = {
        data: [],
        upVoteInfo: [],
        downVoteInfo: []
    };
    public urlRoot: string;

    public voteContainer: string = '#library-content';

    //**************************************************************************

    constructor (
        private _apiServices: ApiServices,
        private _sharedServices: SharedServices,
        private _libraryServices: LlibraryServices,
        private _genresServices: GenresServices,
        private _authorsServices: AuthorsServices,
        private _typesServices: TypesServices,
        private _booksServices: booksServices
    )
    {
        this.urlRoot = this._apiServices.root;
    }

    //**************************************************************************

    public ngOnInit()
    {
        Observable.forkJoin(
            this._typesServices.getCount(),
            this._genresServices.getCount(),
            this._authorsServices.getCount(),
        ).subscribe(
            data => {

                this.sidePanels.push({
                    caption: 'Type',
                    key: 'type',
                    data: data[0]
                });

                this.sidePanels.push({
                    caption: 'Genre',
                    key: 'genre',
                    data: data[1]
                });

                this.sidePanels.push({
                    caption: 'Author',
                    key: 'author',
                    data: data[2]
                });

                this.reload();
            },
            err => {}
        );

        jQuery('#footer').hide();
    }

    //**************************************************************************

    public ngOnDestroy(): void
    {
        jQuery('#footer').show();
    }

    //**************************************************************************

    public reload(): void
    {
        this.books = {
            data: [],
            upVoteInfo: [],
            downVoteInfo: []
        };

        this._libraryServices.getTableData(this._booksServices.api, this.filter)
            .subscribe(
                response => {
                    for (let index in response.data) {
                        if (response.data.hasOwnProperty(index)) {

                            let data = response.data[index];

                            this.books.data.push(data);
                            this.books.upVoteInfo.push({
                                data: data,
                                field: 'upvotes',
                                index: index,
                                value: data.upvotes
                            });
                            this.books.downVoteInfo.push({
                                data: data,
                                field: 'downvotes',
                                index: index,
                                value: data.downvotes
                            });

                        }
                    }
                },
                err => {},
                () => {}
            );
    }

    //**************************************************************************

    public onSideChange(): void
    {
        let params: any = {};

        jQuery('.side-panel-checkbox:checked').map(function() {

            let data = jQuery(this).data();

            let field = data.key + '_id';

            if (! params.hasOwnProperty(field)) {
                params[field] = [];
            }

            params[field].push({
                condition: 'equals-to',
                value: data.id,
                operator: 'OR'
            })
        });

        this.filter['filter'] = params;

        this.reload();
    }

    //**************************************************************************

    public onBookImageClick(dataset: any): boolean
    {
        this._sharedServices.downloadBook(this._booksServices.api, dataset);

        return false;
    }

    //**************************************************************************

}
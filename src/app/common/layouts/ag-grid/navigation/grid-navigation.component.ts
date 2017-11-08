import {Component, Input} from '@angular/core';

import {AgGridServices} from '../ag-grid.services';

import {Constants} from '../../../core/constants';

@Component({
    selector: 'grid-navigation',
    templateUrl: Constants.AG_GRID_NAVIGATION + 'grid-navigation.component.html',
    styleUrls: [
        Constants.AG_GRID_NAVIGATION + 'grid-navigation.component.css'
    ]
})

export class GridNavigationComponent
{
    @Input() data: any;

    public currentPage: number = 1;
    public lastPage: number = 1;

    constructor(
        private _agGridServices: AgGridServices
    )
    {

    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this._agGridServices.setNavigationEmitter
            .subscribe((data: any) => {
                this.setGridNavigation(data);
            }
        );
    }

    //**************************************************************************

    public setGridNavigation(data: any): void
    {
        this.currentPage = data.currentPage;
        this.lastPage = data.lastPage;
    }

    //**************************************************************************

    public goPage(goToGape: string): boolean
    {
        switch (goToGape) {
            case 'first':
                this.currentPage = 1;
                break;
            case 'left':
                this.currentPage = Math.ceil(this.currentPage / 2);
                break;
            case 'prev':
                this.currentPage--;
                break;
            case 'next':
                this.currentPage++;
                break;
            case 'right':
                this.currentPage = this.currentPage + Math.ceil((this.lastPage - this.currentPage + 1) / 2);
                break;
            case 'last':
                this.currentPage = this.lastPage;
                break;
        }

        this._agGridServices.outputUpdate('page', this.currentPage)

        this._agGridServices.reloadTable();

        return false;
    }

    //**************************************************************************
}

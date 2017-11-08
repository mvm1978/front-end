import {Component, Input, ViewEncapsulation} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {GlobalEventsManager} from '../../../modules/global-events-manager';

import {GridHeaderComponent} from '../header/grid-header.component';
import {AgGridServices} from '../ag-grid.services';

import {Constants} from '../../../core/constants';

declare var jQuery: any;

@Component({
    selector: 'grid',
    templateUrl: Constants.AG_GRID_PATH + 'grid/grid.component.html',
    styleUrls: [
        Constants.AG_GRID_PATH + 'grid/grid.component.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class GridComponent
{
    @Input() data: any;

    public isLoadingOverlay: boolean = false;
    private gridOptions: GridOptions;
    public showGrid: boolean;
    public rowData: any[];
    public gridID: string;
    public rowCount: string;

    public pagination: any = {
        current_page: 1,
        last_page: 1
    };

    public message: string;

    constructor(
        private _globalEventsManager: GlobalEventsManager,
        private _agGridServices: AgGridServices
    )
    {

        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};

        this.showGrid = true;
        this.gridOptions.defaultColDef = {
            headerComponentFramework : <{new():GridHeaderComponent}>GridHeaderComponent
        }
    }

    private ngOnInit()
    {
        this._agGridServices.reloadEmitter
            .subscribe(() => {
                this.reload();
            }
        );

        this.pagination.path = this.data.url;

        this.reload();

        let that: any = this;

        Object.keys(this.data).forEach(function(key) {
            that[key] = that.data[key];
        });

        if (this.data.hasOwnProperty('customFunctions')
         && this.data.customFunctions.hasOwnProperty('rowHeight')) {

            let customRowHeight = this.data.customFunctions.rowHeight;

            this.gridOptions.getRowHeight = function(params: any) {
                return customRowHeight(params.data);
            }
        }
    }

    private reload()
    {
console.log(this.pagination);
        this._agGridServices.getTableData(this.pagination.path)
            .subscribe(
                response => {

                    this.rowData = response.data;
console.log(response.data);
                    delete response.data;

                    this.pagination = response;

                    this._agGridServices.setGridNavigation({
                        currentPage: response.current_page,
                        lastPage: response.last_page
                    });
                },
                err => {
                    this.isLoadingOverlay = false;
                },
                () => {
                    this.isLoadingOverlay = false;
                }
            );
    }

    private onModelUpdated()
    {
        let $gridContainer = jQuery('#' + this.gridID);

        let height = jQuery('.ag-pinned-left-cols-container', $gridContainer).height();

        jQuery('ag-grid-angular', $gridContainer).height(height + 25);
    }

    private onReady() {
        console.log('onReady');
    }

    private onCellClicked($event) {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellValueChanged($event: any)
    {
        let colDef = $event.colDef;

        if (this.data.hasOwnProperty('service')
         && colDef.editable && $event.oldValue != $event.newValue) {

        let payload = {
            field: $event.colDef.field,
            value: $event.newValue
        };

        this.data.service.patch(this.rowData[$event.rowIndex].id, payload)
            .subscribe(
                response => {

                    let message = '"' + colDef.headerName + '" was updated';

                    this.footerMessage(message, 'success');

console.log($event);
console.log(this.rowData);
console.log(this.rowData[$event.rowIndex]);

                },
                err => {
                    let message = 'Error updaing "' + colDef.headerName + '"';

                    this.footerMessage(message, 'danger');
                },
                () => {

                }
            );
        }
    }

    private onCellDoubleClicked($event)
    {
    console.log('onCellDoubleClicked:');
    }

    private onCellContextMenu($event) {
        console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellFocused($event) {
        console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

    private onRowSelected($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        // console.log('onRowSelected: ' + $event.node.data.name);
    }

    private onSelectionChanged() {
        console.log('selectionChanged');
    }

    private onBeforeFilterChanged() {
        console.log('beforeFilterChanged');
    }

    private onAfterFilterChanged() {
        console.log('afterFilterChanged');
    }

    private onFilterModified() {
        console.log('onFilterModified');
    }

    private onBeforeSortChanged() {
        console.log('onBeforeSortChanged');
    }

    private onAfterSortChanged() {
        console.log('onAfterSortChanged');
    }

    private onVirtualRowRemoved($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    }

    private onRowClicked($event) {
        console.log('onRowClicked: ' + $event.node.data.name);
    }

    public onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    private onColumnEvent($event) {
        console.log('onColumnEvent: ' + $event);
    }

    //**************************************************************************

    private footerMessage(message: string, messageType: string): void
    {
        let $gridContainer = jQuery('#' + this.gridID);

        let $message = jQuery('.alert', $gridContainer);

        $message.addClass('alert-' + messageType);

        this.message = message;

        $message.fadeIn(500);

        setTimeout(function() {
            $message.fadeOut(1000);
        }, 3000);
    }

    //**************************************************************************

}

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

    public gridLoadingOverlay: boolean = false;

    public message: string;

    public rowData: any[];
    public columnDefs: any[];
    public gridID: string;
    public rowCount: string;

    public pagination: any = {
        current_page: 1,
        last_page: 1
    };


    private initSubscription: any = null;
    private gridOptions: GridOptions;

    constructor(
        private _globalEventsManager: GlobalEventsManager,
        private _agGridServices: AgGridServices
    )
    {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions> {};

        this.gridOptions.defaultColDef = {
            headerComponentFramework : <{new():GridHeaderComponent}>GridHeaderComponent
        }
    }

    //**************************************************************************

    private ngOnInit()
    {
        this._agGridServices.set('output', {
            page: 1,
            sort: {},
            filter: {}
        });

        this.initSubscription = this._agGridServices.reloadEmitter
            .subscribe(() => {
                this.reload();
            }
        );

        this.pagination.path = this.data.url;

        this.reload();

        let data: any = this.data;

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }

        if (data.hasOwnProperty('customFunctions')
         && data.customFunctions.hasOwnProperty('rowHeight')) {

            let customRowHeight = data.customFunctions.rowHeight;

            this.gridOptions.getRowHeight = function(params: any) {
                return customRowHeight(params.data);
            }
        }
    }

    //**************************************************************************

    private onGridReady()
    {
console.log('onGridReady');
    }

    //**************************************************************************

    private ngOnDestroy()
    {
        this.initSubscription.unsubscribe();
    }

    //**************************************************************************

    private reload()
    {
        this.gridLoadingOverlay = true;

        if (this.pagination.hasOwnProperty('path') && this.pagination.path) {
            this._agGridServices.getTableData(this.pagination.path)
                .subscribe(
                    response => {

                        this.rowData = response.data;

                        delete response.data;

                        this.pagination = response;

                        this._agGridServices.setGridNavigation({
                            currentPage: response.current_page,
                            lastPage: response.last_page
                        });
                    },
                    err => {
                        this.gridLoadingOverlay = false;
                    },
                    () => {
                        this.gridLoadingOverlay = false;
                    }
                );
        }
    }

    //**************************************************************************

    private onModelUpdated()
    {
        let $gridContainer = jQuery('#' + this.gridID);

        let height = jQuery('.ag-pinned-left-cols-container', $gridContainer).height();

        jQuery('ag-grid-angular', $gridContainer).height(height + 25);
    }

    //**************************************************************************

    private onCellClicked($event) {
console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    //**************************************************************************

    private onCellValueChanged($event: any)
    {
        let colDef = $event.colDef;

        if (this.data.hasOwnProperty('service')
         && colDef.editable && $event.oldValue != $event.newValue) {

        let id = this.rowData[$event.rowIndex].id,
            field = $event.colDef.field,
            payload = {
                value: $event.newValue
            };

        if (colDef.hasOwnProperty('cellEditor')
         && colDef.cellEditor == 'select') {
            // the cell being edited has a dropdown
            let editorParams = colDef.cellEditorParams;
            // substituting with data derived from the dropdown
            field = editorParams.foreignKey;
            payload = {
                value: editorParams.dbValues[$event.newValue]
            };
        }

        this.data.service.patch(field, id, payload)
            .subscribe(
                response => {

                    let message = '"' + colDef.headerName + '" was updated';

                    this.footerMessage(message, 'success');
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

    //**************************************************************************

    private onCellDoubleClicked($event)
    {
console.log('onCellDoubleClicked:');
console.log($event);
        if ($event.colDef.hasOwnProperty('cellEditor')
         && $event.colDef.cellEditor == 'uploader') {

            this._agGridServices.set('uploaderField', $event.colDef.field);
            this._agGridServices.showUploader({
                field: $event.colDef.field,
                caption: $event.colDef.headerName,
                id: $event.data.id
            });
        }
    }

    //**************************************************************************

    private onCellContextMenu($event) {
console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    //**************************************************************************

    private onCellFocused($event) {
console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

    //**************************************************************************

    private onRowSelected($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        // console.log('onRowSelected: ' + $event.node.data.name);
    }

    //**************************************************************************

    private onSelectionChanged() {
console.log('selectionChanged');
    }

    //**************************************************************************

    private onBeforeFilterChanged() {
console.log('beforeFilterChanged');
    }

    //**************************************************************************

    private onAfterFilterChanged() {
console.log('afterFilterChanged');
    }

    //**************************************************************************

    private onFilterModified() {
console.log('onFilterModified');
    }

    //**************************************************************************

    private onBeforeSortChanged() {
console.log('onBeforeSortChanged');
    }

    //**************************************************************************

    private onAfterSortChanged() {
console.log('onAfterSortChanged');
    }

    //**************************************************************************

    private onVirtualRowRemoved($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    }

    //**************************************************************************

    private onRowClicked($event) {
console.log('onRowClicked: ' + $event.node.data.name);
    }

    //**************************************************************************

    public onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    //**************************************************************************

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    private onColumnEvent($event) {
console.log('onColumnEvent: ');
console.log($event);
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

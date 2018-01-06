import {Component, Input, ViewEncapsulation} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {GridHeaderComponent} from '../header/grid-header.component';
import {DownloadButtonComponent} from '../download-button/download-button.component';
import {AgGridServices} from '../ag-grid.services';

import {Constants} from '../../../core/constants';

declare let jQuery: any;

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
    private defaultRowAmount: number = 5;

    constructor(
        private _agGridServices: AgGridServices
    )
    {
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this.gridOptions = <GridOptions> {
            gridID: this.data.gridID,
            onGridSizeChanged: this.onGridSizeChanged
        };

        this.gridOptions.defaultColDef = {
            headerComponentFramework : <{new():GridHeaderComponent}>GridHeaderComponent
        }

        this._agGridServices.set('output', {
            page: 1,
            limit: this.data.hasOwnProperty('limit') ? this.data.limit : this.defaultRowAmount,
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

        for (let key in data) {
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

        for (let count=0; count<this.columnDefs.length; count++) {
            if (this.columnDefs[count].hasOwnProperty('customCellRenderer')) {
                switch (this.columnDefs[count].customCellRenderer) {
                    case 'DownloadButtonComponent':
                        this.columnDefs[count].cellRendererFramework = DownloadButtonComponent;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    //**************************************************************************

    private onGridReady()
    {
console.log('onGridReady');
    }

    //**************************************************************************

    private ngOnDestroy(): void
    {
        this.initSubscription.unsubscribe();
    }

    //**************************************************************************

    public reload(): void
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

    private onModelUpdated(): void
    {
        let $gridContainer = jQuery('#' + this.gridID);

        let height = jQuery('.ag-pinned-left-cols-container', $gridContainer).height();

        jQuery('ag-grid-angular', $gridContainer).height(height + 25);
    }

    //**************************************************************************

    private onGridSizeChanged(params: any): void
    {
        let availableWidth = params.clientWidth,
            columnsToShow: any = [],
            columnsToHide: any = [],
            significances: any = {},
            allColumns = params.columnApi.getAllColumns();

        for (let count=0; count<allColumns.length; count++) {

            let column = allColumns[count];

            if (! column.colDef.hasOwnProperty('significance')) {
                continue;
            }

            let colSignificance = column.colDef.significance;

            if (! significances.hasOwnProperty(colSignificance)) {
                significances[colSignificance] = [];
            }

            significances[colSignificance].push({
                colID: column.colId,
                width: column.colDef.width
            });
        }

        Object.keys(significances).forEach(function(key) {

            let columns = significances[key];

            for (let count=0; count<columns.length; count++) {

                let column = columns[count];

                if (availableWidth > column.width) {

                    availableWidth -= column.width;

                    columnsToShow.push(column.colID);
                } else {
                    columnsToHide.push(column.colID);
                }
            }
        });

        params.columnApi.setColumnsVisible(columnsToShow, true);
        params.columnApi.setColumnsVisible(columnsToHide, false);
    }

    //**************************************************************************

    private onCellClicked($event: any): void
    {
console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    //**************************************************************************

    private onCellValueChanged($event: any): void
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

                    let message = err.status == 401 ?
                            'Unauthorized access. Please sign up' :
                            'Error updaing "' + colDef.headerName + '"';

                    this.footerMessage(message, 'danger');
                },
                () => {

                }
            );
        }
    }

    //**************************************************************************

    private onCellDoubleClicked($event: any): void
    {
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

    private onCellContextMenu($event: any): void
    {
console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    //**************************************************************************

    private onCellFocused($event: any): void
    {
console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

    //**************************************************************************

    private onRowSelected($event: any): void
    {
    }

    //**************************************************************************

    private onSelectionChanged(): void
    {
console.log('selectionChanged');
    }

    //**************************************************************************

    private onBeforeFilterChanged(): void
    {
console.log('beforeFilterChanged');
    }

    //**************************************************************************

    private onAfterFilterChanged(): void
    {
console.log('afterFilterChanged');
    }

    //**************************************************************************

    private onFilterModified(): void
    {
console.log('onFilterModified');
    }

    //**************************************************************************

    private onBeforeSortChanged(): void
    {
console.log('onBeforeSortChanged');
    }

    //**************************************************************************

    private onAfterSortChanged(): void
    {
console.log('onAfterSortChanged');
    }

    //**************************************************************************

    private onVirtualRowRemoved($event: any): void
    {
    }

    //**************************************************************************

    private onRowClicked($event: any): void
    {
console.log('onRowClicked: ' + $event.node.data.name);
    }

    //**************************************************************************

    public onQuickFilterChanged($event: any): void
    {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    //**************************************************************************

    private onColumnEvent($event: any): void
    {
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

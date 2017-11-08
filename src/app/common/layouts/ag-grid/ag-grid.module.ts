import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AgGridModule} from 'ag-grid-angular/main';

import {AgGridServices} from '../ag-grid/ag-grid.services';

import {AgGridComponent} from '../ag-grid/ag-grid.component';
import {GridComponent} from '../ag-grid/grid/grid.component';
import {GridHeaderComponent} from '../ag-grid/header/grid-header.component';
import {GridFilterComponent} from '../ag-grid/filter/grid-filter.component';
import {GridNavigationComponent} from '../ag-grid/navigation/grid-navigation.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AgGridModule.withComponents(
            [
                GridHeaderComponent
            ]
        )
    ],
    providers: [
        AgGridServices
    ],
    declarations: [
        AgGridComponent,
        GridComponent,
        GridHeaderComponent,
        GridFilterComponent,
        GridNavigationComponent
    ],
    exports: [
        AgGridComponent,
        GridComponent,
        GridHeaderComponent,
        GridFilterComponent,
        GridNavigationComponent
    ]
})

export class RichGridModule {}

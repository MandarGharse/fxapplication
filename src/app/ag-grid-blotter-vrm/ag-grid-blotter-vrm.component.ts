import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridReadyEvent,
  ICellRendererComp,
  ICellRendererParams,
  IViewportDatasource,
  RowModelType,
  ValueFormatterParams,
  GridOptions,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { WebsocketService } from '../websocket.service';
import { TradeService } from '../trade.service';
import { GridApi } from 'ag-grid';
import { Trade } from '../domain/Trade';

declare function createViewportDatasource(
  websocketService: any,
  tradeService: any
): IViewportDatasource;

@Component({
  selector: 'app-ag-grid-blotter-vrm',
  template: `
    <ag-grid-angular
      style="width: 100%; height: 500px;"
      class="ag-theme-alpine"
      [gridOptions]="gridOptions"
      [rowSelection]="rowSelection"
      [rowModelType]="rowModelType"
      [getRowId]="getRowId"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})

// @Component({
//   selector: 'app-ag-grid-blotter-vrm',
//   templateUrl: './ag-grid-blotter-vrm.component.html',
//   styleUrls: ['./ag-grid-blotter-vrm.component.css'],
// })
export class AgGridBlotterVrmComponent {
  public columnDefs: ColDef[] = [
    { field: 'ccyPair', suppressSizeToFit: false },
    { field: 'buySell', suppressSizeToFit: false },
    { field: 'dealtCcy', suppressSizeToFit: false },
    { field: 'dealtAmount', suppressSizeToFit: false },
    { field: 'counterAmount', minWidth: 1200, suppressSizeToFit: false },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 140,
  };
  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    suppressRowClickSelection: true,
    groupSelectsChildren: true,
    rowSelection: 'multiple',
    // rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    paginationAutoPageSize: true,
    // viewportRowModelPageSize: 5,
  };

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowModelType: RowModelType = 'viewport';
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    // the code is unique, so perfect for the id
    return params.data.code;
  };
  public rowData!: Trade[];
  public api: GridApi;
  params: any;

  constructor(
    private http: HttpClient,
    public websocketService: WebsocketService,
    public tradeService: TradeService
  ) {}

  onGridReady(params: GridReadyEvent) {
    var viewportDatasource = createViewportDatasource(
      this.websocketService,
      this.tradeService
    );
    params.api!.setViewportDatasource(viewportDatasource);
    // put the 'size cols to fit' into a timeout, so that the scroll is taken into consideration
    setTimeout(function () {
      params.api!.sizeColumnsToFit();
    }, 100);
  }
}

class RowIndexRenderer implements ICellRendererComp {
  eGui!: HTMLDivElement;
  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = '' + params.rowIndex;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  getGui(): HTMLElement {
    return this.eGui;
  }
}

function numberFormatter(params: ValueFormatterParams) {
  if (typeof params.value === 'number') {
    return params.value.toFixed(2);
  } else {
    return params.value;
  }
}

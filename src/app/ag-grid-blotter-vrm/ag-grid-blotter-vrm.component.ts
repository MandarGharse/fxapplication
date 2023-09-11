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
} from 'ag-grid-community';
import 'ag-grid-enterprise';

// @Component({
//   selector: 'app-ag-grid-blotter-vrm',
//   templateUrl: './ag-grid-blotter-vrm.component.html',
//   styleUrls: ['./ag-grid-blotter-vrm.component.css']
// })

declare function createMockServer(): any;
declare function createViewportDatasource(mockServer: any): IViewportDatasource;

@Component({
  selector: 'app-ag-grid-blotter-vrm',
  template: `
    <ag-grid-angular
      style="width: 100%; height: 50%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowSelection]="rowSelection"
      [rowModelType]="rowModelType"
      [getRowId]="getRowId"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class AgGridBlotterVrmComponent {
  public columnDefs: ColDef[] = [
    // this col shows the row index, doesn't use any data from the row
    {
      headerName: '#',
      maxWidth: 80,
      cellRenderer: RowIndexRenderer,
    },
    { field: 'code', maxWidth: 90 },
    { field: 'name', minWidth: 220 },
    {
      field: 'bid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'mid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'ask',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'volume',
      cellClass: 'cell-number',
      cellRenderer: 'agAnimateSlideCellRenderer',
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 140,
    resizable: true,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowModelType: RowModelType = 'viewport';
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    // the code is unique, so perfect for the id
    return params.data.code;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/stocks.json')
      .subscribe((data) => {
        // set up a mock server - real code will not do this, it will contact your
        // real server to get what it needs
        var mockServer = createMockServer();
        mockServer.init(data);
        var viewportDatasource = createViewportDatasource(mockServer);
        params.api!.setViewportDatasource(viewportDatasource);
        // put the 'size cols to fit' into a timeout, so that the scroll is taken into consideration
        setTimeout(function () {
          params.api!.sizeColumnsToFit();
        }, 100);
      });
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

import { Component } from '@angular/core';
import {
  ColDef,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  RowModelType,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Trade } from '../domain/Trade';
import { WebsocketService } from '../websocket.service';
import { TradeService } from '../trade.service';
import { GridApi } from 'ag-grid';

@Component({
  selector: 'app-ag-grid-blotter-ssrm',
  templateUrl: './ag-grid-blotter-ssrm.component.html',
  styleUrls: ['./ag-grid-blotter-ssrm.component.css'],
  // template: `<ag-grid-angular
  //   style="width: 100%; height: 100%;"
  //   class="ag-theme-alpine-dark"
  //   [columnDefs]="columnDefs"
  //   [defaultColDef]="defaultColDef"
  //   [rowModelType]="rowModelType"
  //   [rowData]="rowData"
  //   (gridReady)="onGridReady($event)"
  // ></ag-grid-angular>`,
})
export class AgGridBlotterSSRMComponent {
  public api: GridApi;

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
    minWidth: 100,
  };
  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    suppressRowClickSelection: true,
    groupSelectsChildren: true,
    rowSelection: 'multiple',
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    paginationAutoPageSize: true,
  };

  public rowModelType: RowModelType = 'serverSide';

  public rowData!: Trade[];

  constructor(
    private websocketService: WebsocketService,
    private tradeService: TradeService
  ) {}

  async onGridReady(params) {
    console.log('waiting for WS to initialize...');
    await this.sleep(5000);
    console.log('wait complete!');
    // TODO : hack to allow WS to initialize

    this.api = params.api;
    params.api.sizeColumnsToFit();
    params.columnApi.autoSizeAllColumns();

    //const dataServer = this.fetchRequestedRowsFromServer();

    // create datasource with a reference to the server
    //const datasource = this.createServerSideDatasource(dataServer);

    //const dataSource = this.createServerSideDatasource(this.dataSource);

    // register the datasource with the grid
    console.log('created server side data source... ');
    params.api!.setServerSideDatasource(this.dataSource);
  }

  onPaginationChanged(params) {
    console.log('onPaginationChanged called... clearing rowData');
    // this.gridOptions.api.refreshServerSideStore();
    //this.gridOptions.api.refreshServerSide();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  dataSource = {
    pageSize: 10,
    //overflowSize: 10,

    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);

      this.rowData = [];
      // this.gridOptions.api.refreshServerSideStore();

      // publish blotter fill and wait for response
      this.websocketService.sendBlotterFill(
        params.request.startRow,
        params.request.endRow
      );

      // get data for request from the data server
      const response = this.fetchRequestedRowsFromServer().getData();

      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };

  fetchRequestedRowsFromServer() {
    return {
      getData: () => {
        this.tradeService.tradeResolutionDataObservable.subscribe(
          (dataObj: any) => {
            if (!this.isEmptyObject(dataObj)) {
              console.log(
                'rendering GRID with new trades. trade count : ' +
                  dataObj.tradeResolutionResponse.length
              );

              for (
                let index = 0;
                index < dataObj.tradeResolutionResponse.trades.length;
                index++
              ) {
                this.rowData.push(
                  dataObj.tradeResolutionResponse.trades[index]
                );
              }
            }
          }
        );

        return {
          success: true,
          rows: this.rowData,
        };
      },
    };
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }
}

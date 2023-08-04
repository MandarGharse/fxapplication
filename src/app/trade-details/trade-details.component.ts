import { Component, OnInit } from '@angular/core';
import { TradeService } from '../trade.service';
import { Trade } from '../domain/Trade';
import { ColDef, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.css'],

  template: ` <button (click)="sendMessage()">Send Message</button> `,
})
export class TradeDetailsComponent implements OnInit {
  receivedMessages: string[] = [];

  ngOnInit(): void {
    this.websocketService.connect();
    this.websocketService.messageReceived.subscribe((message: string) => {
      this.receivedMessages.push(message);
    });

    this.tradeService.tradeDataObservable.subscribe((trade) => {
      console.log(trade);
      if (!this.isEmptyObject(trade)) {
        this.rowData.push(trade);
        this.gridApi.setRowData(this.rowData); // Refresh grid
      }
    });
  }

  sendMessage(): void {
    const message = 'Hello, WebSocket!';
    this.websocketService.sendMessage(message);
  }

  constructor(
    private websocketService: WebsocketService,
    private tradeService: TradeService
  ) {}

  private gridApi;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'ccyPair', width: 150 },
    { field: 'buySell', width: 150 },
    { field: 'dealtCcy', width: 150 },
    { field: 'dealtAmount', width: 200, resizable: true },
    { field: 'counterAmount', width: 200, resizable: true },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  rowData = [];

  myRowClass = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return 'my-shaded-effect-white';
    }
    return 'my-shaded-effect-blue';
  };

  gridOptions: GridOptions = {
    rowData: this.rowData,
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    pagination: true,
    paginationPageSize: 20,
    rowSelection: 'multiple',
    getRowClass: this.myRowClass,
    rowHeight: 25,

    // Add event handlers
    onRowClicked: (event) => console.log('A row was clicked'),
    onColumnResized: (event) => console.log('A column was resized'),
    onGridReady: (event) => console.log('The grid is now ready'),
  };

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    //this.gridOptions.columnApi.sizeColumnsToFit(500);
    this.gridApi = params.api; // To access the grids API
    params.columnApi.autoSizeAllColumns();
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }
}

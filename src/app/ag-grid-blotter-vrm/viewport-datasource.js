function createViewportDatasource(websocketService, tradeService) {
    var firstRow, lastRow;

    // client code (ie your code) will call this constructor, pass in whatever you need for the
    // viewport to do its job
    class ViewportDatasource {
        constructor(websocketService, tradeService) {
            console.log("ViewportDatasource constructor called with websocketService : " + websocketService + ", tradeService : " + tradeService);
            this.websocketService = websocketService;
            this.tradeService = tradeService;

            this.tradeService.tradeResolutionDataObservable.subscribe(
                (dataObj) => {
                    if (!this.isEmptyObject(dataObj)) {
                        var rowDataMap = {};
                        const tradeCount = this.tradeService.blotterSubscriptionDataObj.blotterSubscriptionResponse.totalTradeCount;
                        console.log(
                        'rendering GRID with new trades. trade count : ' + tradeCount
                        );

                        var counter = 0;
                        for (var i = this.firstRow; i <= this.lastRow; i++) {
                            rowDataMap[i] = dataObj.tradeResolutionResponse.trades[counter++];
                        }
                        this.params.setRowCount(tradeCount);
                        this.params.setRowData(rowDataMap);
                    }
                }
                
                // (dataObj) => {
                //     var rowDataMap = {};
                //     console.log("firstRow:"+this.firstRow+" lastRow:"+this.lastRow);
                //     for (var i = this.firstRow; i <= this.lastRow; i++) {
                //         rowDataMap[i] = JSON.parse('{"ccyPair":"USD/MXN","buySell":"Buy","dealtCcy":"MXN","dealtAmount":145077.64053717031,"counterAmount":1156503.6693648659,"tradeDate":"20230911","valueDate":"20230911","fixingDate":"20230912","usdAmount":2086791.4404210753}');
                //     }
                //     const tradeCount = this.tradeService.blotterSubscriptionDataObj.blotterSubscriptionResponse.totalTradeCount;
                //     this.params.setRowCount(tradeCount);
                //     this.params.setRowData(rowDataMap);
                //     //this.params.setRowData(dataObj.tradeResolutionResponse.trades);
                //     console.log("tradeCount:"+tradeCount+", rowDataMap>>>"+dataObj.tradeResolutionResponse.trades);
                // }
            );

        }

        // gets called by the grid, tells us what rows the grid is displaying, so time for
        // us to tell the server to give us the rows for that displayed range
        setViewportRange(firstRow, lastRow) {
            console.log('setViewportRange: ' + firstRow + ' to ' + lastRow);

            this.firstRow = firstRow;
            this.lastRow = lastRow;
            this.websocketService.sendBlotterFill(
                // publish blotter fill and wait for response
                firstRow,
                lastRow+1
            );
        }
  
        // gets called by the grid, provides us with the callbacks we need
        async init(params) {
            console.log("init called with params ");
            this.params = params;

            console.log('TODO : waiting for WS to initialize...');
            await this.sleep(5000);

            const tradeCount = this.tradeService.blotterSubscriptionDataObj.blotterSubscriptionResponse.totalTradeCount
            var keepRenderedRows = true; // prevents unnecessary row redraws
            this.params.setRowCount(tradeCount, keepRenderedRows);
            console.log("grid rowCount set to : " + tradeCount);
        }

        // gets called by grid, when grid is destroyed or this datasource is swapped out for another one
        destroy() {
            //this.mockServer.disconnect(this.connectionId);
        }
  
        // manages events back from the server
        eventListener(event) {
            switch (event.eventType) {
                case 'rowCountChanged':
                this.onRowCountChanged(event);
                break;
                case 'rowData':
                this.onRowData(event);
                break;
                case 'dataUpdated':
                this.onDataUpdated(event);
                break;
            }
        }
  
        // process rowData event
        onRowData(event) {
            var rowDataFromServer = event.rowDataMap;
            this.params.setRowData(rowDataFromServer);
        }
  
        // process dataUpdated event
        onDataUpdated(event) {
            var that = this;
            event.changes.forEach(function (change) {
            var rowNode = that.params.getRow(change.rowIndex);
            // if the rowNode is missing, it means the grid is not displaying that row.
            // if the data is missing, it means the rowNode is there, but that data has not
            // loaded into it yet, so to early to set delta changes.
            if (!rowNode || !rowNode.data) {
                return;
            }
            // rowNode.data[change.columnId] = change.newValue;
            // this is a trick, it gets the row to refresh
            rowNode.setDataValue(change.columnId, change.newValue);
            });
        }
  
        // process rowCount event
        onRowCountChanged(event) {
            console.log("onRowCountChanged from server : " + event.rowCount);
            var rowCountFromServer = event.rowCount;
            // this will get the grid to make set the height of the row container, so we can scroll vertically properly
            var keepRenderedRows = true; // prevents unnecessary row redraws
            this.params.setRowCount(rowCountFromServer, keepRenderedRows);
        }

        isEmptyObject(obj) {
            return obj && Object.keys(obj).length === 0;
        }
 
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

    }

    return new ViewportDatasource(websocketService, tradeService);

  }
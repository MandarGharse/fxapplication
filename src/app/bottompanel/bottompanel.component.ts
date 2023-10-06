import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Subscriber } from '../Subscriber';
import { TradeService } from '../trade.service';
import { Subject } from 'rxjs';
import { TradeKey } from '../domain/TradeKey';

@Component({
  selector: 'app-bottompanel',
  templateUrl: './bottompanel.component.html',
  styleUrls: ['./bottompanel.component.css'],
})
export class BottompanelComponent implements OnInit {
  blotterSubscriptionSubject = new Subject<string>();
  blotterFillSubject = new Subject<string>();
  tradeResolutionSubject = new Subject<string>();

  constructor(
    private tradeService: TradeService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    let self = this;
    this.websocketService.connect([
      new Subscriber('/user/queue/blotter_subscription', function (data) {
        console.log('blotter_subscription Response rcvd data :: ' + data);
        self.blotterSubscriptionSubject.next(data.body);
      }),
      new Subscriber('/user/queue/blotter_fill', function (data) {
        console.log('blotter_fill Response rcvd data...');
        self.blotterFillSubject.next(data.body);
      }),
      new Subscriber('/user/queue/trade_resolution', function (data) {
        console.log('trade_resolution Response rcvd data...');
        self.tradeResolutionSubject.next(data.body);
      }),
    ]);

    this.blotterSubscriptionSubject.subscribe((data) => {
      console.log('processing blotter subscription data ' + data);

      var dataObj = JSON.parse(data);

      this.tradeService.blotterSubscriptionDataReceived(dataObj);

      // if (dataObj.hasOwnProperty('trades')) {
      //   this.tradeService.blotterSubscriptionDataReceived(dataObj.trades);
      // }
    });

    this.blotterFillSubject.subscribe((data) => {
      var dataObj = JSON.parse(data);

      console.log(
        'processing blotter fill data. trade count : ' +
          dataObj.blotterFillResponse.tradesData.length
      );

      let tradeKeyVersionList = [];

      for (
        let index = 0;
        index < dataObj.blotterFillResponse.tradesData.length;
        index++
      ) {
        const tradeKeyVersion = new TradeKey();
        tradeKeyVersion.tradeKey =
          dataObj.blotterFillResponse.tradesData[index].tradeKey;
        tradeKeyVersion.tradeVersion =
          dataObj.blotterFillResponse.tradesData[index].tradeVersion;

        tradeKeyVersionList.push(tradeKeyVersion);
      }

      const tradeResolutionRequest = {
        sessionId: this.websocketService.userName,
        tradeKeys: tradeKeyVersionList,
      };

      this.websocketService.sendTradeResolution(tradeResolutionRequest);
    });

    this.tradeResolutionSubject.subscribe((data) => {
      console.log('processing trade resolution data...');

      var dataObj = JSON.parse(data);

      this.tradeService.tradeResolutionDataReceived(dataObj);
    });
  }

  isChartVisible: boolean = false;
  togglecharts() {
    console.log(
      'toggle charts called. current status isChartVisible ' +
        this.isChartVisible
    );
    if (this.isChartVisible) {
      // hide charts
      this.isChartVisible = false;
    } else {
      // show charts
      this.isChartVisible = true;
    }
    console.log(
      'toggle charts updated status isChartVisible to ' + this.isChartVisible
    );
  }
}

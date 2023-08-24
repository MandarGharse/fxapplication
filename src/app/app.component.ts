import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subscriber } from './Subscriber';
import { TradeService } from './trade.service';
import { Subject } from 'rxjs';
import { Trade } from './domain/Trade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  tradeBookingSubject = new Subject<string>();
  tradesSubject = new Subject<string>();
  summarySubject = new Subject<string>();

  constructor(
    private tradeService: TradeService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    let self = this;
    this.websocketService.connect([
      new Subscriber('/user/queue/booking', function (data) {
        self.tradeBookingSubject.next(data.body);
      }),
      new Subscriber('/user/queue/fxtrades_subscription', function (data) {
        console.log('FXTrades Response rcvd data :: ' + data);
        self.tradesSubject.next(data.body);
      }),
    ]);

    this.tradeBookingSubject.subscribe((data) => {
      console.log('processing booking response data ' + data);
      const trades: Trade[] = [];
      trades.push(JSON.parse(data));

      this.tradeService.updateTradeData(trades);
    });

    this.tradesSubject.subscribe((data) => {
      console.log('processing trades data ' + data);
      var dataObj = JSON.parse(data);

      console.log(
        "dataObj.hasOwnProperty('trades') ? " + dataObj.hasOwnProperty('trades')
      );
      console.log(
        "dataObj.hasOwnProperty('summary') ? " +
          dataObj.hasOwnProperty('summary')
      );

      if (dataObj.hasOwnProperty('trades')) {
        this.tradeService.updateTradeData(dataObj.trades);
      }

      if (dataObj.hasOwnProperty('summary')) {
        this.tradeService.updateSummaryData(dataObj.summary);
      }
    });
  }
}

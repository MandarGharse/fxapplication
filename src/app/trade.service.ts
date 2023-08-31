import { Injectable } from '@angular/core';
import { Trade } from './domain/Trade';
import { BehaviorSubject } from 'rxjs';
import { TradeSummary } from './domain/TradeSummary';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private blotterSubscriptionDataMessage: BehaviorSubject<Object> =
    new BehaviorSubject<Object>(new Array<Trade>());
  private tradeSubscriptionDataMessage: BehaviorSubject<TradeSummary> =
    new BehaviorSubject<TradeSummary>(new TradeSummary());

  blotterSubscriptionDataObservable =
    this.blotterSubscriptionDataMessage.asObservable();
  tradeSubscriptionDataObservable =
    this.tradeSubscriptionDataMessage.asObservable();

  constructor() {}

  blotterSubscriptionDataReceived(dataObj) {
    this.blotterSubscriptionDataMessage.next(dataObj);
  }

  // updateTradeData(trades: Trade[]) {
  //   this.tradeDataMessage.next(trades);
  // }

  // updateSummaryData(summary: TradeSummary) {
  //   this.summaryDataMessage.next(summary);
  // }
}

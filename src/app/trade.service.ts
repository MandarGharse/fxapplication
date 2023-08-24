import { Injectable } from '@angular/core';
import { Trade } from './domain/Trade';
import { BehaviorSubject } from 'rxjs';
import { TradeSummary } from './domain/TradeSummary';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private tradeDataMessage: BehaviorSubject<Trade[]> = new BehaviorSubject<
    Trade[]
  >(new Array<Trade>());
  private summaryDataMessage: BehaviorSubject<TradeSummary> =
    new BehaviorSubject<TradeSummary>(new TradeSummary());

  tradeDataObservable = this.tradeDataMessage.asObservable();
  summaryDataObservable = this.summaryDataMessage.asObservable();

  constructor() {}

  updateTradeData(trades: Trade[]) {
    this.tradeDataMessage.next(trades);
  }

  updateSummaryData(summary: TradeSummary) {
    this.summaryDataMessage.next(summary);
  }
}

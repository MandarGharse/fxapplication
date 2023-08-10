import { Injectable } from '@angular/core';
import { Trade } from './domain/Trade';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private tradeDataMessage: BehaviorSubject<Trade[]> = new BehaviorSubject<
    Trade[]
  >(new Array<Trade>());

  tradeDataObservable = this.tradeDataMessage.asObservable();

  constructor() {}

  updateTradeData(trades: Trade[]) {
    this.tradeDataMessage.next(trades);
  }
}

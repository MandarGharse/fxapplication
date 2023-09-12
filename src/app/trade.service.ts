import { Injectable } from '@angular/core';
import { Trade } from './domain/Trade';
import { BehaviorSubject } from 'rxjs';
import { TradeSummary } from './domain/TradeSummary';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private blotterSubscriptionDataMessage: BehaviorSubject<Object> =
    new BehaviorSubject<Object>(new Array());

  private tradeResolutionDataMessage: BehaviorSubject<Object> =
    new BehaviorSubject<Object>(new Array());

  blotterSubscriptionDataObservable =
    this.blotterSubscriptionDataMessage.asObservable();

  tradeResolutionDataObservable =
    this.tradeResolutionDataMessage.asObservable();

  public blotterSubscriptionDataObj;

  constructor() {}

  blotterSubscriptionDataReceived(dataObj) {
    this.blotterSubscriptionDataObj = dataObj;
    this.blotterSubscriptionDataMessage.next(dataObj);
  }

  tradeResolutionDataReceived(dataObj) {
    this.tradeResolutionDataMessage.next(dataObj);
  }
}

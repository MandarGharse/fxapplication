import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  private pricingSubscriptionDataMessage: BehaviorSubject<Object> =
    new BehaviorSubject<Object>(new Array());

  pricingSubscriptionDataObservable =
    this.pricingSubscriptionDataMessage.asObservable();

  public pricingSubscriptionDataObj;

  constructor() {}

  pricingSubscriptionDataReceived(dataObj) {
    this.pricingSubscriptionDataObj = dataObj;
    console.log(
      'pricingSubscriptionDataReceived >>> ' + this.pricingSubscriptionDataObj
    );
    console.log('pricingSubscriptionDataReceived >>> ' + dataObj);
    this.pricingSubscriptionDataMessage.next(dataObj);
  }
}

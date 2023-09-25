import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  total_trades_label: string;
  total_trades_value: number = 0;
  net_position_label: string;
  net_position_value: number = 0;

  constructor(private tradeService: TradeService) {}

  ngOnInit() {
    this.total_trades_label = 'Total Trades : ';
    this.net_position_label = 'Net Position (USD) : ';

    this.tradeService.tradeResolutionDataObservable.subscribe((dataObj) => {
      if (!this.isEmptyObject(dataObj)) {
        this.total_trades_value =
          this.tradeService.blotterSubscriptionDataObj.blotterSubscriptionResponse.totalTradeCount;
        this.net_position_value =
          this.tradeService.blotterSubscriptionDataObj.blotterSubscriptionResponse.totalTradeVolume;
      }
    });
  }

  onMatIconExpandLessClick()  {
    console.log("onMatIconExpandLessClick clicked");
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

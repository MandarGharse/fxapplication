import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Trade } from 'src/app/domain/Trade';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-trade-capture',
  templateUrl: './trade-capture.component.html',
  styleUrls: ['./trade-capture.component.css'],
})
export class TradeCaptureComponent implements OnInit {
  ccyPair: string;
  buySell: string;
  dealtCcy: string;
  dealtAmount: number;
  counterAmount: number;

  constructor(private tradeService: TradeService) {}

  ngOnInit(): void {}

  onSubmit() {
    const trade = {
      ccyPair: this.ccyPair,
      buySell: this.buySell,
      dealtCcy: this.dealtCcy,
      dealtAmount: this.dealtAmount,
      counterAmount: this.counterAmount,
    };
    this.tradeService.updateTradeData(trade);
  }
}

import { Component } from '@angular/core';
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
  }
}

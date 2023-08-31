import { Component } from '@angular/core';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css'],
})
export class KpiComponent {
  total_trades_label: string;
  total_trades_value: number = 0;
  tradedate_today_label: string;
  tradedate_today_value: number = 0;
  valuedate_today_label: string;
  valuedate_today_value: number = 0;
  fixingdate_today_label: string;
  fixingdate_today_value: number = 0;

  constructor(private tradeService: TradeService) {}

  ngOnInit() {
    this.total_trades_label = 'Total Trades';
    this.tradedate_today_label = "Today's Trades";
    this.valuedate_today_label = 'Settling Today';
    this.fixingdate_today_label = 'Fixing Today';

    this.tradeService.blotterSubscriptionDataObservable.subscribe(
      (dataObj: any) => {
        if (!this.isEmptyObject(dataObj)) {
          console.log(
            'rendering KPI with new tradeSummary ' +
              dataObj.blotterSubscriptionResponse
          );

          for (
            let index = 0;
            index <
            dataObj.blotterSubscriptionResponse.summaryResponse.summary[0]
              .statistics.length;
            index++
          ) {
            const element =
              dataObj.blotterSubscriptionResponse.summaryResponse.summary[0]
                .statistics[index];

            if (element.key == 'TOTAL_TRADES') {
              this.total_trades_value = element.count;
            } else if (element.key == 'TRADEDATE_TODAY') {
              this.tradedate_today_value = element.count;
            } else if (element.key == 'VALUEDATE_TODAY') {
              this.valuedate_today_value = element.count;
            } else if (element.key == 'FIXINGDATE_TODAY') {
              this.fixingdate_today_value = element.count;
            }
          }
        }
      }
    );
  }

  onClick(selectedId: string) {
    console.log('mat-grid-tile clicked ' + selectedId);
    if (selectedId == 'todaystrades') {
      console.log('todaystrades clicked');
    } else if (selectedId == 'tradedatetoday') {
      console.log('tradedatetoday clicked');
    } else if (selectedId == 'valuedatetoday') {
      console.log('valuedatetoday clicked');
    } else if (selectedId == 'fixingdatetoday') {
      console.log('fixingdatetoday clicked');
    }
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }
}

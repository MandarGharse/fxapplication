import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { TradeService } from '../trade.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  title = 'ng-chart';
  chart: any = [];
  myChartData = [];

  constructor(private tradeService: TradeService) {}

  ngOnInit() {
    const myChartLabels = [
      'Total Trades',
      'Trade Date Today',
      'Value Date Today',
      'Fixing Date Today',
    ];

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: myChartLabels,
        datasets: [
          {
            data: this.myChartData,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    this.tradeService.blotterSubscriptionDataObservable.subscribe(
      (dataObj: any) => {
        if (!this.isEmptyObject(dataObj)) {
          console.log(
            'rendering chart with new tradeSummary ' +
              dataObj.blotterSubscriptionResponse
          );

          var totalTradesCount = 0,
            totalTradeDateTodayCount = 0,
            totalValueDateTodayCount = 0,
            totalFixingDateTodayCount = 0;
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
              totalTradesCount = element.count;
            } else if (element.key == 'TRADEDATE_TODAY') {
              totalTradeDateTodayCount = element.count;
            } else if (element.key == 'VALUEDATE_TODAY') {
              totalValueDateTodayCount = element.count;
            } else if (element.key == 'FIXINGDATE_TODAY') {
              totalFixingDateTodayCount = element.count;
            }
          }

          this.myChartData = [
            totalTradesCount,
            totalTradeDateTodayCount,
            totalValueDateTodayCount,
            totalFixingDateTodayCount,
          ];

          let dataUpdate = {
            labels: myChartLabels,
            datasets: [
              {
                fill: false,
                innerWidth: 200,
                outerWidth: 200,
                innerHeight: 200,
                outerHeight: 200,
                borderWidth: 3,
                pointStyle: 'line',
                pointHoverRadius: 4,
                pointHoverBorderWidth: 12,

                data: this.myChartData,
              },
            ],
          };
          this.chart.data = dataUpdate;
          this.chart.update();
        }
      }
    );
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  ngOnInit_delete() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

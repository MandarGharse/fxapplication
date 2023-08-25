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
      'Value Today',
      'TradeDate Today',
      'Fixing Today',
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
      }
    });

    this.tradeService.summaryDataObservable.subscribe((tradeSummary) => {
      if (!this.isEmptyObject(tradeSummary)) {
        console.log(
          'rendering chart with new tradeSummary ' +
            tradeSummary.totalTrades +
            ' ' +
            tradeSummary.tradesValuedateToday +
            ' ' +
            tradeSummary.tradesTradedateToday
        );
        this.myChartData = [
          tradeSummary.totalTrades,
          tradeSummary.tradesValuedateToday,
          tradeSummary.tradesTradedateToday,
        ];
        // this.chart.data.datasets.length = 0;
        // this.chart.update();

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
    });
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

import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subscriber } from './Subscriber';
import { TradeService } from './trade.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  tradeSubject = new Subject<string>();

  constructor(
    private tradeService: TradeService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    let self = this;
    this.websocketService.connect([
      new Subscriber('/topic/greetings', function (data) {
        console.log('Greeting Subscriber 1 rcvd data :: ' + data);
        self.tradeSubject.next(data.body);
      }),
      new Subscriber('/topic/greetings', function (data) {
        console.log('Greeting Subscriber 2 rcvd data :: ' + data);
      }),
    ]);

    this.tradeSubject.subscribe((data) => {
      console.log('processing trade data ' + data);
      this.tradeService.updateTradeData(JSON.parse(data));
    });
  }
}

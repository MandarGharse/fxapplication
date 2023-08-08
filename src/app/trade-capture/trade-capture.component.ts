import { Injectable } from '@angular/core';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebsocketService } from '../websocket.service';

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

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {}

  onSubmit() {
    const trade = {
      ccyPair: this.ccyPair,
      buySell: this.buySell,
      dealtCcy: this.dealtCcy,
      dealtAmount: this.dealtAmount,
      counterAmount: this.counterAmount,
    };

    this.websocketService.sendMessage('/app/greet', JSON.stringify(trade));
  }
}

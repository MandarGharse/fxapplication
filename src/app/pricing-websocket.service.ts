import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client/dist/sockjs';
import { Subscriber } from './Subscriber';

@Injectable({
  providedIn: 'root',
})
export class PricingWebsocketService {
  stompClient: any;
  responseSubject = new Subject<String>();
  webSocketEndpoint: string = 'http://16.16.161.87:8082/fxapp-ws';
  // webSocketEndpoint: string = 'http://16.16.161.87:8080/fxapp-ws';
  // webSocketEndpoint: string = 'http://127.0.0.1:8080/fxapp-ws';

  userName: string;

  connect(subscribers: Subscriber[] = null) {
    console.log('Initialize Pricing WebSocket Connection. connecting ...');
    let ws = SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);
    console.log('connected to pricing websocket service !');

    const _this = this;

    this.stompClient.connect(
      {},
      (frame) => {
        console.log(
          'connected to pricing websocket ' +
            _this.stompClient +
            ' User>>>' +
            frame.headers['user-name']
        );
        this.userName = frame.headers['user-name'];

        subscribers.forEach((subscriber) => {
          _this.stompClient.subscribe(subscriber.URL, subscriber.CALLBACK);
        });
      },
      () => {}
    );
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('Pricing Disconnected');
  }

  errorCallBack(error: any) {
    console.log('pricing errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  sendMessage(topic: string, message: string) {
    this.stompClient.send(topic, {}, message);
  }

  sendPricingRequest(pricingRequest) {
    console.log(
      'sending pricingRequest to server ' + JSON.stringify(pricingRequest)
    );
    this.sendMessage(
      '/app/pricing_subscription',
      JSON.stringify(pricingRequest)
    );
  }
}

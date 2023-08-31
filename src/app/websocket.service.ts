import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client/dist/sockjs';
import { Subscriber } from './Subscriber';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  stompClient: any;
  responseSubject = new Subject<String>();
  webSocketEndpoint: string = 'http://localhost:8080/fxapp-ws';
  userName: string;

  connect(subscribers: Subscriber[] = null) {
    console.log('Initialize WebSocket Connection. connecting ...');
    let ws = SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);
    console.log('connected!');
    console.log('stompClient >>> ' + this.stompClient.user);

    const _this = this;

    this.stompClient.connect(
      {},
      (frame) => {
        console.log(
          'connected to websocket ' +
            _this.stompClient +
            ' User>>>' +
            frame.headers['user-name']
        );
        this.userName = frame.headers['user-name'];

        subscribers.forEach((subscriber) => {
          _this.stompClient.subscribe(subscriber.URL, subscriber.CALLBACK);
        });

        this.fxTradesSubscriptionRequest();
      },
      () => {}
    );
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  sendMessage(topic: string, message: string) {
    console.log('Sending Message :: ' + message);
    this.stompClient.send(topic, {}, message);
  }

  // onMessageReceived(message: any) {
  //   console.log('Message Received from Server :: ' + message.body);
  //   this.responseSubject.next(message);
  // }

  // TODO : clients should subscribe for WS ready message and request directly
  fxTradesSubscriptionRequest() {
    // Request for trades from server

    // const fxTradesSubscriptionRequest = {
    //   sessionId: this.userName,
    //   type: 1,
    // };
    // console.log(
    //   'Requesting trades data from server ' +
    //     JSON.stringify(fxTradesSubscriptionRequest)
    // );
    // this.sendMessage(
    //   '/app/fxtrades_subscription',
    //   JSON.stringify(fxTradesSubscriptionRequest)
    // );

    const blotterSubscriptionRequest = {
      sessionId: this.userName,
      type: 1,
    };
    console.log(
      'sending blotterSubscriptionRequest to server ' +
        JSON.stringify(blotterSubscriptionRequest)
    );
    this.sendMessage(
      '/app/blotter_subscription',
      JSON.stringify(blotterSubscriptionRequest)
    );
  }

  fxTradesFillSubscriptionRequest() {
    // Request for trades from server
    const fxTradesRequest = {
      sessionId: this.userName,
      startIndex: 1,
      endIndex: 20,
    };
    console.log(
      'Requesting trades data from server ' + JSON.stringify(fxTradesRequest)
    );
    this.sendMessage(
      '/app/fxtrades_subscription',
      JSON.stringify(fxTradesRequest)
    );
  }
}

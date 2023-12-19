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
  webSocketEndpoint: string = 'http://16.16.161.87:8082/fxapp-ws';
  // webSocketEndpoint: string = 'http://16.16.161.87:8080/fxapp-ws';
  // webSocketEndpoint: string = 'http://127.0.0.1:8080/fxapp-ws';
  userName: string;

  connect(subscribers: Subscriber[] = null) {
    console.log('Initialize WebSocket Connection. connecting ...');
    let ws = SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);
    console.log('connected!');

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

        // TODO : clients should subscribe for WS ready message and request directly
        this.sendBlotterSubscription();
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
    //console.log('Sending Message :: ' + message);
    this.stompClient.send(topic, {}, message);
  }

  sendBlotterSubscription() {
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

  sendBlotterFill(startIndex, endIndex) {
    const blotterFillRequest = {
      sessionId: this.userName,
      startIndex: startIndex,
      endIndex: endIndex,
    };
    console.log(
      'sending blotterFillRequest to server ' +
        JSON.stringify(blotterFillRequest)
    );
    this.sendMessage('/app/blotter_fill', JSON.stringify(blotterFillRequest));
  }

  sendTradeResolution(tradeResolutionRequest) {
    console.log(
      'sending tradeResolutionRequest to server ' +
        JSON.stringify(tradeResolutionRequest)
    );
    this.sendMessage(
      '/app/trade_resolution',
      JSON.stringify(tradeResolutionRequest)
    );
  }
}

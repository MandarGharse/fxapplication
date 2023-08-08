import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import { Subject } from 'rxjs';
import { Message } from './domain/Message';
import { Greeting } from './domain/Greeting';
import * as SockJS from 'sockjs-client/dist/sockjs';
import { Subscriber } from './Subscriber';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  stompClient: any;
  responseSubject = new Subject<String>();
  webSocketEndpoint: string = 'http://localhost:8080/ws';

  connect(subscribers: Subscriber[] = null) {
    console.log('Initialize WebSocket Connection. connecting ...');
    let ws = SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);
    console.log('connected!');

    const _this = this;

    this.stompClient.connect(
      {},
      (frame) => {
        subscribers.forEach((subscriber) => {
          _this.stompClient.subscribe(subscriber.URL, subscriber.CALLBACK);
        });
      },
      () => {
        console.log(_this.stompClient);
      }
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

  sendMessage(topic: string, message: String) {
    console.log('Sending Message :: ' + message);
    this.stompClient.send(topic, {}, message);
  }

  // onMessageReceived(message: any) {
  //   console.log('Message Received from Server :: ' + message.body);
  //   this.responseSubject.next(message);
  // }
}

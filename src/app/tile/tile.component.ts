import { Component } from '@angular/core';
import { Tile } from '../domain/Tile';
import { PricingWebsocketService } from '../pricing-websocket.service';
import { Subject } from 'rxjs';
import { Subscriber } from '../Subscriber';
import { PricingService } from '../pricing.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
})
export class TileComponent {
  pricingSubscriptionSubject = new Subject<string>();

  tiles: Tile[] = [
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
    new Tile(),
  ];

  ccyPairList: Array<any> = [
    { code: 1, name: "EUR/USD" },
    { code: 2, name: "EUR/GBP" },
    { code: 3, name: "EUR/MXN" },
    { code: 1, name: "USD/JPY" },
    { code: 2, name: "GBP/USD" },
    { code: 3, name: "USD/INR" },
    { code: 1, name: "EUR/NOK" },
    { code: 2, name: "USD/RUB" },
  ];
  
  constructor(
    private pricingWebsocketService: PricingWebsocketService,
    private pricingService: PricingService
  ) {}

  async ngOnInit() {
    let self = this;
    this.pricingWebsocketService.connect([
      new Subscriber('/user/queue/pricing_subscription', function (data) {
        console.log('pricing_subscription Response rcvd data :: ' + data);
        self.pricingSubscriptionSubject.next(data.body);
      }),
    ]);

    this.pricingSubscriptionSubject.subscribe((data) => {
      console.log('processing pricing subscription data ' + data);

      var dataObj = JSON.parse(data);

      this.pricingService.pricingSubscriptionDataReceived(dataObj);
    });

    this.tiles[0].id = 'ID-0';
    this.tiles[0].ccyPair = 'EUR/USD';
    this.tiles[0].valueDate = '10032023';

    this.tiles[1].id = 'ID-1';
    this.tiles[1].ccyPair = 'EUR/GBP';
    this.tiles[1].valueDate = '10032023';

    this.tiles[2].id = 'ID-2';
    this.tiles[2].ccyPair = 'EUR/MXN';
    this.tiles[2].valueDate = '10032023';

    this.tiles[3].id = 'ID-3';
    this.tiles[3].ccyPair = 'USD/JPY';
    this.tiles[3].valueDate = '10032023';

    this.tiles[4].id = 'ID-4';
    this.tiles[4].ccyPair = 'GBP/USD';
    this.tiles[4].valueDate = '10032023';

    this.tiles[5].id = 'ID-5';
    this.tiles[5].ccyPair = 'USD/INR';
    this.tiles[5].valueDate = '10032023';

    this.tiles[6].id = 'ID-6';
    this.tiles[6].ccyPair = 'EUR/NOK';
    this.tiles[6].valueDate = '10032023';

    this.tiles[7].id = 'ID-7';
    this.tiles[7].ccyPair = 'USD/RUB';
    this.tiles[7].valueDate = '10032023';

    console.log('waiting for WS to initialize...');
    await this.sleep(5000);
    console.log('wait complete!');
    // TODO : hack to allow WS to initialize

    // send pricing request for all tiles
    for (let index = 0; index < 8; index++) {
      const pricingRequest = {
        sessionId: this.pricingWebsocketService.userName,
        id: this.tiles[index].id,
        ccyPair: this.tiles[index].ccyPair,
        valueDate: this.tiles[index].valueDate,
      };
      this.pricingWebsocketService.sendPricingRequest(pricingRequest);
    }

    this.pricingService.pricingSubscriptionDataObservable.subscribe(
      (dataObj: any) => {
        if (!this.isEmptyObject(dataObj)) {
          console.log('rendering pricing tiles...' + dataObj);
          // TODO : find index of pricing tile and render bid/ask
          for (let index = 0; index < 8; index++) {
            console.log(
              'checking recvd id ' +
                dataObj.pricingSubscriptionResponse.id +
                ' with tile id ' +
                this.tiles[index].id
            );
            if (
              dataObj.pricingSubscriptionResponse.id == this.tiles[index].id
            ) {
              console.log(
                'found matching id ' +
                  this.tiles[index].id +
                  '. index : ' +
                  index
              );
              console.log(
                'oldBidRate:' +
                  this.tiles[index].bidRate +
                  ' newBidRate::' +
                  dataObj.pricingSubscriptionResponse.price.bidRate
              );
              if (
                this.tiles[index].bidRate >
                dataObj.pricingSubscriptionResponse.price.bidRate
              )
                this.tiles[index].pricetickImage = 'pricetickdownnew.jpg';
              else this.tiles[index].pricetickImage = 'pricetickupnew.jpg';
              this.tiles[index].bidRate =
                dataObj.pricingSubscriptionResponse.price.bidRate;
              this.tiles[index].askRate =
                dataObj.pricingSubscriptionResponse.price.askRate;

              console.log(
                'done setting bidRate:' +
                  dataObj.pricingSubscriptionResponse.price.bidRate +
                  ' askRate:' +
                  dataObj.pricingSubscriptionResponse.price.askRate +
                  ' for tile index:' +
                  index
              );
              break;
            }
          }
        }
      }
    );
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

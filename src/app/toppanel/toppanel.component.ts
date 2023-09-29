import { Component } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../domain/Tile';

@Component({
  selector: 'app-toppanel',
  templateUrl: './toppanel.component.html',
  styleUrls: ['./toppanel.component.css'],
})
export class ToppanelComponent {
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
  tileCards: TileComponent[] = [
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
  ];
  spotTileCards: TileComponent[] = [
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
    new TileComponent(),
  ];

  ngOnInit() {
    this.tiles[0].ccyPair = 'ID-0';
    this.tiles[0].ccyPair = 'EUR/USD';
    this.tiles[0].bidRate = '1.1234';
    this.tiles[0].askRate = '1.1235';

    this.tiles[1].ccyPair = 'ID-1';
    this.tiles[1].ccyPair = 'EUR/GBP';
    this.tiles[1].bidRate = '1.10';
    this.tiles[1].askRate = '1.12';

    this.tiles[2].ccyPair = 'ID-2';
    this.tiles[2].ccyPair = 'EUR/GBP';
    this.tiles[2].bidRate = '1.10';
    this.tiles[2].askRate = '1.12';

    this.tiles[3].ccyPair = 'ID-3';
    this.tiles[3].ccyPair = 'EUR/GBP';
    this.tiles[3].bidRate = '1.10';
    this.tiles[3].askRate = '1.12';

    this.tiles[4].ccyPair = 'ID-4';
    this.tiles[4].ccyPair = 'EUR/GBP';
    this.tiles[4].bidRate = '1.10';
    this.tiles[4].askRate = '1.12';

    this.tiles[5].ccyPair = 'ID-5';
    this.tiles[5].ccyPair = 'EUR/GBP';
    this.tiles[5].bidRate = '1.10';
    this.tiles[5].askRate = '1.12';

    this.tiles[6].ccyPair = 'ID-6';
    this.tiles[6].ccyPair = 'EUR/GBP';
    this.tiles[6].bidRate = '1.10';
    this.tiles[6].askRate = '1.12';

    this.tiles[7].ccyPair = 'ID-7';
    this.tiles[7].ccyPair = 'EUR/GBP';
    this.tiles[7].bidRate = '1.10';
    this.tiles[7].askRate = '1.12';
  }
}

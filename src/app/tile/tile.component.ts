import { Component, Input } from '@angular/core';
import { Tile } from '../domain/Tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
})
export class TileComponent {
  @Input() tile: Tile;

  ngOnInit() {
    console.log('tile : ' + this.tile);
  }
}

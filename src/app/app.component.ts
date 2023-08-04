import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { FxapplicationService } from './fxapplication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService, FxapplicationService],
})
export class AppComponent {
  title = 'fxApplication';
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeCaptureComponent } from './trade-capture/trade-capture.component';
import { TradeDetailsComponent } from './trade-details/trade-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TradeCaptureComponent, TradeDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

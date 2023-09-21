import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeCaptureComponent } from './trade-capture/trade-capture.component';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { KpiComponent } from './kpi/kpi.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterComponent } from './footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AgGridBlotterSSRMComponent } from './ag-grid-blotter-ssrm/ag-grid-blotter-ssrm.component';
import { AgGridBlotterVrmComponent } from './ag-grid-blotter-vrm/ag-grid-blotter-vrm.component';
import { Chart2Component } from './chart2/chart2.component';

@NgModule({
  declarations: [
    AppComponent,
    TradeCaptureComponent,
    ChartComponent,
    KpiComponent,
    FooterComponent,
    AgGridBlotterSSRMComponent,
    AgGridBlotterVrmComponent,
    Chart2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    MatGridListModule,
    MatTabsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

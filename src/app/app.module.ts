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
import { MatIconModule } from '@angular/material/icon';
import { AgGridBlotterSSRMComponent } from './ag-grid-blotter-ssrm/ag-grid-blotter-ssrm.component';
import { AgGridBlotterVrmComponent } from './ag-grid-blotter-vrm/ag-grid-blotter-vrm.component';
import { Chart2Component } from './chart2/chart2.component';
import { TestComponent } from './test/test.component';
import { Navigation1Component } from './navigation1/navigation1.component';
import { Navigation2Component } from './navigation2/navigation2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ToppanelComponent } from './toppanel/toppanel.component';
import { TileComponent } from './tile/tile.component';
import { BottompanelComponent } from './bottompanel/bottompanel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    TestComponent,
    Navigation1Component,
    Navigation2Component,
    ToppanelComponent,
    TileComponent,
    BottompanelComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    MatGridListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

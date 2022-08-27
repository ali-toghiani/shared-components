import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";

import { NzTableModule } from "ng-zorro-antd/table";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";

import { ViewChartComponent} from "@shared-components/src/app/view-chart/view-chart/view-chart.component";

import { ChartTabsComponent } from './chart-tabs/chart-tabs.component';

@NgModule({
  declarations: [
    ViewChartComponent,
    ChartTabsComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzTabsModule,
    TranslateModule,
    NzIconModule,
    NzButtonModule
  ],
  exports: [
    ViewChartComponent,
    ChartTabsComponent
  ]
})
export class ViewChartModule { }

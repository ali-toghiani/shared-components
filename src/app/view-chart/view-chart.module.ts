import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewChartComponent} from "@shared-components/src/app/view-chart/view-chart/view-chart.component";

@NgModule({
  declarations: [
    ViewChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ViewChartComponent
  ]
})
export class ViewChartModule { }

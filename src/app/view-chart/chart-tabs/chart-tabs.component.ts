import {Component, OnInit, Input} from '@angular/core';

import { ChartTypesArray, ChartTypesType } from "@shared-components/src/app/view-chart/chart-types";
import { PorslineQuestion, SurveyQuestion } from "@models";

@Component({
  selector: 'app-chart-tabs',
  templateUrl: './chart-tabs.component.html',
  styleUrls: ['./chart-tabs.component.scss']
})
export class ChartTabsComponent implements OnInit {

  @Input() chartData: PorslineQuestion | SurveyQuestion;

  exportClicked;
  isLoadingExport = false;

  selectedTabIndex = 0;
  selectedChartType: ChartTypesType = ChartTypesArray[this.selectedTabIndex];

  constructor() { }

  ngOnInit(): void {
  }

  get chartTypesArray(): string[]{
    return ChartTypesArray;
  }

  onExportBtnClicked(): void{
    this.isLoadingExport = true;
    this.exportClicked = !!!this.exportClicked;
  }
}

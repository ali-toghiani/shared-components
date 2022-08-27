import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

import Chart from "chart.js/auto";
import { ChartTypeRegistry } from "chart.js";
import { PorslineQuestion, SurveyQuestion } from "@models";
import { ChartTypesType, ChartTypesArray } from "@shared-components/src/app/view-chart/chart-types";

const ChartTypes = {
  1: "bar",
  2: "pie",
  bar : "bar",
  pie : "pie",
  doughnut : "doughnut",
  line : "line",
  polarArea : "polarArea",
  radar : "radar",
}

type ChartTypes = typeof ChartTypes[keyof typeof ChartTypes];

const colors = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(75, 192, 192)',
  'rgb(255, 159, 64)',
  'rgb(153, 102, 255)',
  'rgb(255, 205, 86)',
  'rgb(201, 203, 207)',
  '#00ff00',
  '#ff00ff',
  '#00ffff',
  '#ffa500'
]

@Component({
  selector: 'app-view-chart',
  templateUrl: './view-chart.component.html',
  styleUrls: ['./view-chart.component.scss']
})

export class ViewChartComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;
  @ViewChild('exportCanvas') exportCanvasRef: ElementRef;

  @Input() questionData: PorslineQuestion | SurveyQuestion;
  @Input() set setChartType(type: ChartTypesType){
    this.selectedChartType = type;
    this.reloadChart();
  }

  @Input() set onExport(type: any){
    this.exportChart()
  }

  @Output() exportCompleted = new EventEmitter<boolean>();
  ctx;
  exportCtx;
  chart;
  chartConfig;
  hqChart;
  isLoading = true;
  selectedTabIndex = 0;
  selectedChartType: ChartTypesType = ChartTypesArray[this.selectedTabIndex];
  chartInvalidError = false;

  constructor() { }

  ngOnInit(): void {
  }

  get chartTypesArray(): string[]{
    return ChartTypesArray;
  }

  ngAfterViewInit(): void {
    if (this.questionData){
      this.generateChartData();
    }
  }

  initChart(): void{
    // const chartType = this.questionData.customChartSettings ? this.questionData.customChartSettings.type : ChartTypes[this.questionData.charts[0].type];
    const chartType = ChartTypes[this.questionData.charts[0].type];
    if (chartType && ChartTypes[chartType]) {
      this.selectedChartType = ChartTypes[chartType];
      this.generateChartData();
    } else {
      this.chartInvalidError = true;
    }
  }

  generateChartData(): void {
    let chartLabels: string[] = [];
    let datasetFrequecy: number[] = [];
    this.questionData.choices.forEach(choice => {
      chartLabels.push(choice.title);
      datasetFrequecy.push(choice.frequency)
    })

    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chartConfig = {
      type: this.selectedChartType as keyof ChartTypeRegistry,
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: datasetFrequecy,
            fill: colors,
            backgroundColor: colors,
          }
        ]
      },
      options: {

        plugins: {
          legend: {
            display: this.shouldDisplayLegend(),
            position: 'bottom',
            labels:{
              text: this.questionData.title,
            }
          }
        }
      }
    };
    this.chart = new Chart(this.ctx, this.chartConfig);
    this.isLoading = false;
  }

  shouldDisplayLegend():boolean{
    const noLegendChartTypes= [ChartTypes.bar,ChartTypes.line, ChartTypes.radar];
    return !noLegendChartTypes.some(item => item === this.selectedChartType);
  }

  reloadChart():void{
    if (!this.isLoading){
    // this.selectedChartType = this.questionData.customChartSettings ? this.questionData.customChartSettings.type : ChartTypes[this.questionData.charts[0].type];
    this.isLoading = true;
    this.chart.destroy();
    this.generateChartData();
    }
  }

  exportChart(): void{
    if (!this.isLoading){
      this.exportCtx = this.exportCanvasRef.nativeElement.getContext('2d');
      this.hqChart =  new Chart(this.exportCtx,
        {
          ...this.chartConfig,
          options: {
            animation: {onComplete: () => this.downloadImage()},
            scales: !this.shouldDisplayLegend() ? {
              x:{
                ticks:{
                  font:{size:32}}
              },
              y:{
                ticks:{
                  font:{size:32}}
              }
            } : {},
            plugins: {
              legend: {
                ...this.chartConfig.options.plugins.legend,
                labels:{font: {size: 32}}
              },
            }
          }
        })
      this.hqChart.render()
    }
  }

  downloadImage(): void{
    var image = this.hqChart.toBase64Image('image/jpg', 1);

    const link = document.createElement('a');
    link.setAttribute('href', image);
    link.setAttribute('download', this.selectedChartType + '-chart');
    link.click();
    this.exportCompleted.emit(true);
    this.hqChart.destroy();
  }

}

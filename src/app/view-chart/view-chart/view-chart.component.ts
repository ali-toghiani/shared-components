import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import Chart from "chart.js/auto";
import { ChartTypeRegistry } from "chart.js";
import { SurveyQuestion } from "@models";

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
  questionData: SurveyQuestion
  @Input() set setQuestionData(data: SurveyQuestion){
    this.questionData = data;
    this.reloadChart(data);
  }

  ctx;
  chart;
  isLoading = true;
  selectedChartType: ChartTypes;
  chartInvalidError = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.questionData){
      this.initChart();
    }
  }

  initChart(): void{
    const chartType = this.questionData.customChartSettings ? this.questionData.customChartSettings.type : ChartTypes[this.questionData.charts[0].type];
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
    this.chart = new Chart(this.ctx, {
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
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            title:{
              text: this.questionData.title
            }
          }
        }
      }
    });
    this.isLoading = false;
  }

  reloadChart(event: SurveyQuestion):void{
    if (!this.isLoading){
    this.selectedChartType = this.questionData.customChartSettings ? this.questionData.customChartSettings.type : ChartTypes[this.questionData.charts[0].type];
    this.isLoading = true;
    this.chart.destroy();
    this.generateChartData();
    }
  }

}

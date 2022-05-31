import { Component, OnInit, Input } from '@angular/core';
import {HeaderModel} from "./models/header.model";
import {ActionbarModel} from "./models/actionbar.model";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  @Input() headerConfig: HeaderModel;
  @Input() actionbarConfig: ActionbarModel;
  constructor() { }

  ngOnInit(): void {
  }

}

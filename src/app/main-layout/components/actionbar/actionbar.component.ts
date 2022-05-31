import { Component, OnInit, Input } from '@angular/core';
import {ActionbarModel} from "../../models/actionbar.model";

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent implements OnInit {

  @Input() actionbarConfig : ActionbarModel;
  constructor() { }

  ngOnInit(): void {
  }

  onBackClicked(){
    history.back();
  }
}

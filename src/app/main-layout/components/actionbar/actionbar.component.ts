import { Component, OnInit, Input } from '@angular/core';

import { ActionbarModel } from "../../models/actionbar.model";
// FIXME: move MainLayoutService to shared-components
import { MainLayoutService } from "../../../../../../src/app/services/main-layout.service";

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent implements OnInit {

  @Input() actionbarConfig : ActionbarModel;
  constructor(
    private layoutService: MainLayoutService
  ) { }

  ngOnInit(): void {
  }

  onBackClicked(){
    history.back();
  }

  itemClicked( title: string): void{
    this.layoutService.actionbarClickEvent.emit(title);
  }

  getTailwindColor(color: 'green' | 'red' | 'orange'): string{
    if (color){
      const colors = {
        green: "#52c41a",
        red: "#ef4565",
        orange: "#ff8906"
      }
      return colors[color];
    }
    return "#3da9fc";
  }
}

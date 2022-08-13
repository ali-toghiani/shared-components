import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {ActionbarModel, ActionItem} from "../../models/actionbar.model";
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
    private layoutService: MainLayoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.actionbarConfig = { actions: []};
      }
    });
  }

  onBackClicked(){
    history.back();
  }

  itemClicked( action: ActionItem): void{
    if (action.link){
      this.router.navigate(action.link);
    } else {
      this.layoutService.actionbarClickEvent.emit(action.title);
    }
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

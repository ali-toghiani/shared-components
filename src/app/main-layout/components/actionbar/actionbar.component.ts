import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subscription } from "rxjs";

import { ActionbarModel, ActionItem } from "../../models/actionbar.model";
// FIXME: move MainLayoutService to shared-components
import { MainLayoutService } from "@services";

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent implements OnInit {

  actionbarConfig : ActionbarModel = {isBackDisabled: false, actions: []};

  subscriptions = new Subscription();
  constructor(
    private layoutService: MainLayoutService,
    private router: Router
  ) {
    this.layoutService.actionbarConfigSubject.subscribe( actionbarConf => {
      this.actionbarConfig = actionbarConf;
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
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

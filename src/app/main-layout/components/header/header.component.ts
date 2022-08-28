import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from "rxjs";

import { HeaderModel } from "../../models/header.model";
import { MainLayoutService, TokenService } from "@services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  headerConfig: HeaderModel;

  subscriptions = new Subscription();

  constructor(
    private tokenService: TokenService,
    private layoutService: MainLayoutService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.layoutService.headerConfigSubject.subscribe(header => {
        this.headerConfig = header;
      })
    )
    this.tokenService.getToken();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onLogout(): void{
    this.tokenService.onSignOut();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { AngularSvgIconModule} from "angular-svg-icon";
import { NzIconModule } from 'ng-zorro-antd/icon';

import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ActionbarComponent } from './components/actionbar/actionbar.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    ActionbarComponent,

  ],
  exports: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    NzIconModule,
    TranslateModule
  ]
})
export class MainLayoutModule { }

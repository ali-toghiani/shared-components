import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ActionbarComponent } from './components/actionbar/actionbar.component';
import { RouterModule } from "@angular/router";
import { AngularSvgIconModule} from "angular-svg-icon";

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
    AngularSvgIconModule
  ]
})
export class MainLayoutModule { }

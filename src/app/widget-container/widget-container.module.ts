import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { WidgetContainerComponent } from './widget-container.component';

@NgModule({
    declarations: [
      WidgetContainerComponent
    ],
    exports: [
      WidgetContainerComponent
    ],
    imports: [
      CommonModule,
      NzSpinModule,
      NzIconModule
    ]
})
export class WidgetContainerModule { }

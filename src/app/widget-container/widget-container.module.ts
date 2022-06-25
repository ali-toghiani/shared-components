import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContainerComponent } from './widget-container.component';



@NgModule({
    declarations: [
        WidgetContainerComponent
    ],
    exports: [
        WidgetContainerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class WidgetContainerModule { }

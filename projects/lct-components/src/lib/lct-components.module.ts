import { NgModule } from '@angular/core';
import { LctComponentsComponent } from './lct-components.component';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { SelectComponent } from './select/select.component';
import { ButtonComponent } from './button/button.component';
import { InputTextComponent } from './input-text/input-text.component';
import { LoadingComponent } from './loading/loading.component';
import {SwitchComponent} from "./switch/switch.component";
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip/tooltip.component';



@NgModule({
  declarations: [
    ButtonComponent,
    InputTextComponent,
    LctComponentsComponent,
    SelectComponent,
    SelectMultipleComponent,
    LoadingComponent,
    SwitchComponent,
    TooltipDirective,
    TooltipComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    InputTextComponent,
    LctComponentsComponent,
    SelectComponent,
    SelectMultipleComponent,
    LoadingComponent,
    SwitchComponent,
    TooltipDirective
  ],
  entryComponents:[TooltipComponent]
})
export class LctComponentsModule { }

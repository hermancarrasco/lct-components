import { NgModule } from '@angular/core';
import { InputTextComponent } from './input-text.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    InputTextComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputTextComponent
  ]
})
export class LctInputTextModule { }

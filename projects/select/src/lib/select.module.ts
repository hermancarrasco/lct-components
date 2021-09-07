import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    SelectComponent
  ]
})
export class LctSelectModule { }

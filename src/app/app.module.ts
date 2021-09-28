import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ButtonLctComponent} from './button-lct/button-lct.component';
import {InputText2Component} from "./input-text2/input-text2.component";
import {FormsModule} from "@angular/forms";
import { SelectComponent } from './select/select.component';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import { SelectMultiple2Component } from './select-multiple2/select-multiple2.component';
import {LctComponentsModule} from "../../projects/lct-components/src/lib/lct-components.module";

@NgModule({
  declarations: [
    AppComponent,
    ButtonLctComponent,
    InputText2Component,
    SelectComponent,
    SelectMultipleComponent,
    SelectMultiple2Component,
  ],
  imports: [
    BrowserModule,
    LctComponentsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

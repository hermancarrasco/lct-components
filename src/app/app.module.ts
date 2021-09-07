import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ButtonLctComponent} from './button-lct/button-lct.component';
import {LctButtonModule} from "../../projects/button/src/lib/button.module";
import {LctInputTextModule} from "../../projects/input-text/src/lib/input-text.module";
import {InputText2Component} from "./input-text2/input-text2.component";
import {FormsModule} from "@angular/forms";
import { SelectComponent } from './select/select.component';
import {LctSelectModule} from "../../projects/select/src/lib/select.module";

@NgModule({
  declarations: [
    AppComponent,
    ButtonLctComponent,
    InputText2Component,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    LctButtonModule,
    LctInputTextModule,
    LctSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

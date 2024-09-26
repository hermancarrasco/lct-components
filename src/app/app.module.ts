import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ComponentsModule} from "./components/components.module";
import { AppRoutingModule } from './app-routing.module';
import { ButtonRoundComponent } from './components/button-round/button-round.component';
import { LctComponentsModule } from '../../projects/lct-components/src/lib/lct-components.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonRoundComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    LctComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

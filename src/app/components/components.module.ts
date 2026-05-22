import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import {LctComponentsModule} from "../../../projects/lct-components/src/lib/lct-components.module";
import {FormsModule} from "@angular/forms";
import { ButtonSimpleComponent } from './button-simple/button-simple.component';
import {RouterModule} from "@angular/router";
import { ButtonWithIconComponent } from './button-with-icon/button-with-icon.component';
import { ButtonWithCounterComponent } from './button-with-counter/button-with-counter.component';
import { InputSimpleComponent } from './input-simple/input-simple.component';
import { InputWithIconComponent } from './input-with-icon/input-with-icon.component';
import { SelectSimpleComponent } from './select-simple/select-simple.component';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import { SwitchComponent } from './switch/switch.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SelectMultipleNestedComponent } from './select-multiple-nested/select-multiple-nested.component';
import { RateExperienceComponent } from './rate-experience/rate-experience.component';
import { ReceivedGeneratorDemoComponent } from './documents/received-generator-demo/received-generator-demo.component';
import { LctReceivedGeneratorComponent } from 'projects/lct-components/src/public-api';
import { DispatchGeneratorDemoComponent } from './documents/dispatch-generator-demo/dispatch-generator-demo.component';
import { LctDispatchGeneratorComponent } from 'projects/lct-components/src/public-api';

@NgModule({
  declarations: [
    MenuComponent,
    ContentComponent,
    ButtonSimpleComponent,
    ButtonWithIconComponent,
    ButtonWithCounterComponent,
    InputSimpleComponent,
    InputWithIconComponent,
    SelectSimpleComponent,
    SelectMultipleComponent,
    SwitchComponent,
    TooltipComponent,
    SelectMultipleNestedComponent,
    RateExperienceComponent,
    ReceivedGeneratorDemoComponent,
    DispatchGeneratorDemoComponent,
  ],
  exports: [
    ContentComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    LctComponentsModule,
    FormsModule,
    RouterModule,
    LctReceivedGeneratorComponent,
    LctDispatchGeneratorComponent,
  ]
})
export class ComponentsModule { }

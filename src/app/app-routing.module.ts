import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ButtonSimpleComponent} from "./components/button-simple/button-simple.component";
import {ButtonWithIconComponent} from "./components/button-with-icon/button-with-icon.component";
import {ButtonWithCounterComponent} from "./components/button-with-counter/button-with-counter.component";
import {InputSimpleComponent} from "./components/input-simple/input-simple.component";
import {InputWithIconComponent} from "./components/input-with-icon/input-with-icon.component";
import {SelectSimpleComponent} from "./components/select-simple/select-simple.component";
import {SelectMultipleComponent} from "./components/select-multiple/select-multiple.component";
import {SelectMultipleNestedComponent} from "./components/select-multiple-nested/select-multiple-nested.component";
import {SwitchComponent} from "./components/switch/switch.component";
import { TooltipComponent } from "./components/tooltip/tooltip.component";
import { ButtonRoundComponent } from './components/button-round/button-round.component';

const routes: Routes = [
  { path: 'buttonSimple', component: ButtonSimpleComponent },
  { path: 'buttonWithIcon', component: ButtonWithIconComponent },
  { path: 'buttonRound', component: ButtonRoundComponent },
  { path: 'buttonWithCounter', component: ButtonWithCounterComponent },
  { path: 'inputSimple', component: InputSimpleComponent},
  { path: 'inputWithIcon', component: InputWithIconComponent},
  { path: 'selectSimple', component: SelectSimpleComponent},
  { path: 'selectMultiple', component: SelectMultipleComponent},
  { path: 'selectMultipleNested', component: SelectMultipleNestedComponent},
  { path: 'switch', component: SwitchComponent},
  { path: 'tooltip', component: TooltipComponent},
  { path: '', redirectTo: '/buttonSimple', pathMatch: 'full' },
  { path: '**', redirectTo: '/buttonSimple', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

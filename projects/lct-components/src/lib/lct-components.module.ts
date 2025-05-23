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
import { ModalTooltipDirective } from './modal-tooltip.directive';
import { ModalTooltipComponent } from './modal-tooltip/modal-tooltip.component';
import { ModalChangeStoreComponent } from './modal/modal-change-store/modal-change-store';
import { ClipboardComponent } from './clipboard/clipboard.component';
import { ClipboardDirective } from './clipboard.directive';
import { SelectMultipleNestedComponent } from './select-multiple-nested/select-multiple-nested.component';
import { RateExperienceComponent } from './rate-experience/rate-experience.component'
import { ToastComponent } from './toast/toast.component'
import { ToastService } from './toast.service';
import { LabelPipe } from './pipes/label.pipe';
import { LabelTitlePipe } from './pipes/label.title.pipe';



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
    TooltipComponent,
    ModalTooltipDirective,
    ModalTooltipComponent,
    ModalChangeStoreComponent,
    ClipboardComponent,
    ClipboardDirective,
    SelectMultipleNestedComponent,
    RateExperienceComponent,
    ToastComponent,
    LabelPipe,
    LabelTitlePipe,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [ToastService],
  exports: [
    ButtonComponent,
    InputTextComponent,
    LctComponentsComponent,
    SelectComponent,
    SelectMultipleComponent,
    LoadingComponent,
    SwitchComponent,
    TooltipDirective,
    ModalTooltipDirective,
    ModalChangeStoreComponent,
    ClipboardDirective,
    SelectMultipleNestedComponent,
    RateExperienceComponent,
    ToastComponent
  ],
})
export class LctComponentsModule { }

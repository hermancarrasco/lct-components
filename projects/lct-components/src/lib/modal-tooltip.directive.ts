import {
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  TemplateRef, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalTooltipComponent } from "./modal-tooltip/modal-tooltip.component";

@Directive({
  selector: '[lctModalTooltip]'
})
export class ModalTooltipDirective {

  constructor(
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  @Input() tooltipText: string = '';
  @Input() version?: string = '';
  @Input() dateVersion: string ='';

  /*   @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary'; */

  @HostListener("click") onMouseEnter(): void {
    const componentFactory = this.resolver.resolveComponentFactory(ModalTooltipComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    if (this.tooltipText) {
      componentRef.instance.nameStore = this.tooltipText;
    }
    if (this.version) {
      componentRef.instance.version = this.version;
    }
    if (this.dateVersion) {
      componentRef.instance.dateVersion = this.dateVersion;
    }
    componentRef.instance.conditional2.subscribe(resp => {
      if (resp) {
        if (this.viewContainerRef) {
          this.viewContainerRef.clear();
        }
      }
    });
  }


}

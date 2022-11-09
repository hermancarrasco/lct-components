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
import { ModalChangeStoreComponent } from './modal/modal-chage-store/modal-change-store';

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
  @Input() dateVersion: string = '';

  @Input() widthModalConfig: string = '100px';
  @Input() heightModalConfig: string = '100px';
  @Input() icon: any;
  @Input() titleModal: string = '';
  @Input() tiendas: any;
  @Input() showChangeStore: any;

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
    if (this.showChangeStore) {
      componentRef.instance.showChangeStore = this.showChangeStore;
    }
    componentRef.instance.conditional2.subscribe(resp => {
      if (resp) {
        if (this.viewContainerRef) {
          this.viewContainerRef.clear();
        }
      }
    });

    componentRef.instance.openModalStore.subscribe(reso => {

      if (reso) {
        const componentFactory = this.resolver.resolveComponentFactory(ModalChangeStoreComponent);
        const componentRef2 = this.viewContainerRef.createComponent(componentFactory);
        if (this.titleModal) {
          componentRef2.instance.titleModal = this.titleModal;
        }
        if (this.widthModalConfig) {
          componentRef2.instance.widthModalConfig = this.widthModalConfig;
        }
        if (this.heightModalConfig) {
          componentRef2.instance.heightModalConfig = this.heightModalConfig;
        }
        if (this.icon) {
          componentRef2.instance.icon = this.icon;
        }
        if (this.tiendas) {
          componentRef2.instance.tiendas = this.tiendas;
        }
        componentRef2.instance.closeModalStore.subscribe(resp => {
          if (resp) {
            if (this.viewContainerRef) {
              this.viewContainerRef.clear();
            }
          }
        })
      }
    });
  }


}

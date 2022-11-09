import {
  ComponentFactoryResolver,
  Directive, HostListener,
  Input,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { ModalTooltipComponent } from "./modal-tooltip/modal-tooltip.component";
import { ModalChangeStoreComponent } from './modal/modal-change-store/modal-change-store';

@Directive({
  selector: '[lctModalTooltip]'
})
export class ModalTooltipDirective implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  @Input() tooltipText: string = '';
  @Input() version?: string = '';
  @Input() dateVersion: string = '';

  @Input() widthModalConfig: string = '100px';
  @Input() heightModalConfig: string = '100px';
  @Input() iconModal: string = '';
  @Input() titleModal: string = '';
  @Input() nodes: { nodeName: string, nodeId: string }[] = [];

  ngOnInit(): void {
    const storeSelected = sessionStorage.getItem('storeSelected');
    if (this.nodes.length > 1 && !storeSelected) {
      this.openModal();
    }
  }

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
    if (this.nodes.length > 1) {
      componentRef.instance.showChangeStore = true;
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
        this.openModal();
      }
    });
  }

  openModal() {
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
    if (this.iconModal) {
      componentRef2.instance.icon = this.iconModal;
    }
    if (this.nodes) {
      componentRef2.instance.tiendas = this.nodes;
    }
    componentRef2.instance.closeModalStore.subscribe(resp => {
      if (resp) {
        if (this.viewContainerRef) {
          this.viewContainerRef.clear();
        }
      }
    })
  }


}

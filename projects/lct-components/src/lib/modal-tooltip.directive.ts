import {
  ComponentFactoryResolver,
  Directive, HostListener,
  Input,
  ViewContainerRef,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ModalTooltipComponent } from "./modal-tooltip/modal-tooltip.component";
import { ModalChangeStoreComponent } from './modal/modal-change-store/modal-change-store';

interface Node {
  nodeName: string;
  nodeId: string;
}
@Directive({
  selector: '[lctModalTooltip]'
})
export class ModalTooltipDirective implements OnInit {


  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  tooltipText: string = '';
  @Input() version?: string = '';
  @Input() dateVersion: string = '';
  @Input() nodes: Node[] = [];
  @Output() changeNode = new EventEmitter<boolean>()
  @Input() isMobile: boolean = false;
  @Input() userId: string = '';

  ngOnInit(): void {
    const storeSelected = sessionStorage.getItem('storeSelected');
    const userID = sessionStorage.getItem('userId');
    this.assingStore();
    if (userID !== this.userId) {
      this.openModal();
    } else {
      if (this.nodes.length > 1 && !storeSelected) {
        this.openModal();
      } else if (this.nodes.length === 1) {
        this.tooltipText = this.nodes[0].nodeName;
        sessionStorage.setItem('storeSelected', JSON.stringify(this.nodes[0]));
      }
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

    componentRef2.instance.widthModalConfig = this.isMobile ? "100%" : '458px';
    componentRef2.instance.heightModalConfig = this.isMobile ? "100%" : '268px';

    if (this.nodes) {
      componentRef2.instance.tiendas = this.nodes;
    }
    if(this.userId){
      componentRef2.instance.userId = this.userId;
    }
    componentRef2.instance.closeModalStore.subscribe(resp => {
      if (typeof resp.change === 'boolean') {
        if (this.viewContainerRef) {
          if (resp.change) {
            this.assingStore();
          }
          this.changeNode.next(resp.change);
          this.viewContainerRef.clear();
        }
      }
    })
  }

  assingStore() {
    const storeSelected = sessionStorage.getItem('storeSelected');
    if (storeSelected) {
      this.tooltipText = JSON.parse(storeSelected)?.nodeName || '';
    }
  }



}

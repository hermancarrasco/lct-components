import {
  ComponentFactoryResolver,
  Directive, HostListener,
  Input,
  ViewContainerRef,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  ComponentFactory,
  ComponentRef
} from '@angular/core';
import { ModalTooltipComponent } from "./modal-tooltip/modal-tooltip.component";
import { ModalChangeStoreComponent } from './modal/modal-change-store/modal-change-store';

interface Node {
  nodeName: string;
  nodeId: string;
  country: string;
  commerce: string;
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
  @Input() country: string = '';
  @Input() nodes: AccessFilter[] = [];
  stores: LctNode[] = [];
  @Output() changeNode = new EventEmitter<boolean>()
  @Input() isMobile: boolean = false;
  @Input() userId: string = '';
  componentRef2: ComponentRef<ModalChangeStoreComponent> | undefined = undefined;

  ngOnInit(): void {
    const userID = sessionStorage.getItem('userId');
    this.formatStore();
    this.assingStore();
    if (userID !== this.userId) {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('storeSelected');
    }
    const storeSelected = sessionStorage.getItem('storeSelected');
    this.selectedStore(storeSelected);
  }

  formatStore() {
    this.nodes.forEach(e => {
      e.node.forEach(nEl => {
        let obj = new LctNode(e.operator, nEl);
        this.stores.push(obj);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.country?.currentValue !== changes.country?.previousValue) {
      if (this.componentRef2 !== undefined) {
        console.log('ejecuta limpiza de conponente y abre el modal');
        this.viewContainerRef.clear();
        this.openModal();
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
    if (this.stores.length > 1) {
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
    this.componentRef2 = this.viewContainerRef.createComponent(componentFactory);

    this.componentRef2.instance.widthModalConfig = this.isMobile ? "100%" : '458px';
    this.componentRef2.instance.heightModalConfig = this.isMobile ? "100%" : '268px';

    if (this.stores) {
      // Filtra las tiendas en base al pais
      this.componentRef2.instance.tiendas = this.stores.filter(x => x.country === this.country);
    }
    if (this.userId) {
      this.componentRef2.instance.userId = this.userId;
    }
    this.componentRef2.instance.closeModalStore.subscribe(resp => {
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

  private selectedStore(storeSelected: string | null) {
    if (this.stores.length > 1 && !storeSelected) {
      this.openModal();
    } else if (this.stores.length === 1) {
      this.tooltipText = this.stores[0].nodeName;
      sessionStorage.setItem('storeSelected', JSON.stringify(this.stores[0]));
    } else {
      console.error('You don`t have store');
    }
  }
}

interface Operator {
  name: string;
  id: string;
  country: string;
  commerce: string;
}
interface ANode {
  nodeId: string;
  nodeName: string;
}
interface AccessFilter {
  operator: Operator;
  node: ANode[];
}

export class LctNode implements Node {
  nodeName: string;
  nodeId: string;
  country: string;
  commerce: string;
  constructor(_operator: any, _node: any) {
    this.nodeName = _node.nodeName;
    this.nodeId = _node.nodeId;
    this.country = _operator.country;
    this.commerce = _operator.commerce;
  }
};
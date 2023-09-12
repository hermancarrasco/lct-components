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
import {TooltipComponent} from "./tooltip/tooltip.component";

@Directive({
  selector: '[lctTooltip]',
})
export class TooltipDirective {

  constructor(
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) {}

  @Input() tooltipText: string= '';
  @Input() secondaryMessage?: string = '';
  @Input() position: 'top' | 'right' | 'left' = 'top';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() marginBottom?: string = '';

  @HostListener("mouseover") onMouseEnter(): void {
    const componentFactory = this.resolver.resolveComponentFactory(TooltipComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    if (this.tooltipText) {
      componentRef.instance.message = this.tooltipText;
    }
    if (this.secondaryMessage) {
      componentRef.instance.secondaryMessage = this.secondaryMessage;
    }
    if(this.marginBottom){
      componentRef.instance.marginBottom = this.marginBottom;
    }
    componentRef.instance.classes = `${this.position} ${this.color} `;
    
  }

  @HostListener("mouseleave") onMouseLeave(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }
}
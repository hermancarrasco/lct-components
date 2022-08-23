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
  @Input() position: 'top' | 'right' = 'top';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @HostListener("click") onMouseEnter(): void {
    const componentFactory = this.resolver.resolveComponentFactory(TooltipComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    if (this.tooltipText) {
      componentRef.instance.message = this.tooltipText;
    }
    if (this.secondaryMessage) {
      componentRef.instance.secondaryMessage = this.secondaryMessage;
    }
    componentRef.instance.classes = `${this.position} ${this.color}`;
  }

/*   @HostListener("mouseleave") onMouseLeave(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  } */
}

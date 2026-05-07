import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Injector,
  Renderer2,
} from '@angular/core';
import {TooltipComponent} from "./tooltip/tooltip.component";

@Directive({
  selector: '[lctTooltip]',
  standalone: false
})
export class TooltipDirective {
  private componentRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef,
  ) {}

  @Input() tooltipText: string | null = '';
  @Input() secondaryMessage?: string | null = '';
  @Input() position: 'top' | 'right' | 'left' | 'top-rigth' = 'top';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() marginBottom?: string = '';

  @HostListener("mouseover") onMouseEnter(): void {
    const message = (this.tooltipText ?? '').trim();
    const secondary = (this.secondaryMessage ?? '').trim();
    if (!message && !secondary) {
      return;
    }

    this.destroyTooltip();
    const componentFactory = this.resolver.resolveComponentFactory(TooltipComponent);
    this.componentRef = componentFactory.create(this.injector);
    if (message) {
      this.componentRef.instance.message = message;
    }
    if (secondary) {
      this.componentRef.instance.secondaryMessage = secondary;
    }
    if(this.marginBottom){
      this.componentRef.instance.marginBottom = this.marginBottom;
    }
    this.componentRef.instance.classes = `${this.position} ${this.color} `;

    this.applicationRef.attachView(this.componentRef.hostView);
    const tooltipRoot = this.componentRef.location.nativeElement as HTMLElement;
    this.renderer.appendChild(document.body, tooltipRoot);
    this.componentRef.changeDetectorRef.detectChanges();
    requestAnimationFrame(() => this.positionTooltip());
  }

  @HostListener("mouseleave") onMouseLeave(): void {
    this.destroyTooltip();
  }

  private destroyTooltip(): void {
    if (!this.componentRef) {
      return;
    }
    this.applicationRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = null;
  }

  private positionTooltip(): void {
    if (!this.componentRef) {
      return;
    }

    const tooltipRoot = this.componentRef.location.nativeElement as HTMLElement;
    const container = tooltipRoot.querySelector('.tooltipLCT') as HTMLElement | null;
    const text = tooltipRoot.querySelector('.tooltipLCTText') as HTMLElement | null;
    if (!container || !text) {
      return;
    }

    this.renderer.setStyle(container, 'position', 'fixed');
    this.renderer.setStyle(container, 'top', '0px');
    this.renderer.setStyle(container, 'left', '0px');
    this.renderer.setStyle(container, 'bottom', 'auto');
    this.renderer.setStyle(container, 'right', 'auto');
    this.renderer.setStyle(container, 'pointer-events', 'none');

    this.renderer.setStyle(text, 'position', 'relative');
    this.renderer.setStyle(text, 'top', '0px');
    this.renderer.setStyle(text, 'left', '0px');

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipRect = text.getBoundingClientRect();
    const padding = 8;
    const extraTop = this.marginBottom && this.position === 'top' ? (parseFloat(this.marginBottom) || 0) : 0;

    let top = 0;
    let left = 0;

    if (this.position === 'right') {
      top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
      left = hostRect.right + padding;
    } else if (this.position === 'left') {
      top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
      left = hostRect.left - tooltipRect.width - padding;
    } else if (this.position ===  'top-rigth') { 
      top = hostRect.top - tooltipRect.height - extraTop;
      left = hostRect.right - (hostRect.right/3);
    } else {
      top = hostRect.top - tooltipRect.height - padding - extraTop;
      left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
    }

    const maxLeft = window.innerWidth - tooltipRect.width - padding;
    const maxTop = window.innerHeight - tooltipRect.height - padding;
    const clampedLeft = Math.max(padding, Math.min(left, maxLeft));
    const clampedTop = Math.max(padding, Math.min(top, maxTop));

    this.renderer.setStyle(container, 'left', `${clampedLeft}px`);
    this.renderer.setStyle(container, 'top', `${clampedTop}px`);
  }
}

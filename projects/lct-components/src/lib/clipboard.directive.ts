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
import {ClipboardComponent} from "./clipboard/clipboard.component";

@Directive({
  selector: '[lctClipboard]',
})
export class ClipboardDirective {

  constructor(
    // private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @Input() textCopy: string= '';

  ngOnInit() {
    this.loadImageComponent();
  }
  private loadImageComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ClipboardComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    // Si tienes una lógica para pasar datos al componente de imagen, aquí puedes hacerlo
     if (this.textCopy) {
      componentRef.instance.message = this.textCopy;
    }
  }

}
import {
  AfterViewInit,
  Component,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnInit,
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from "@angular/forms";
// import {TooltipComponent} from "../tooltip/tooltip.component";

@Component({
  selector: 'lct-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ClipboardComponent,
    multi: true
  }]
})
export class ClipboardComponent implements OnInit, AfterViewInit {

  message: string = '';
  copyActive: boolean = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    // private resolver: ComponentFactoryResolver,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.message)
      .then(() => {
        console.log('Texto copiado al portapapeles: ', this.message);
        this.copyActive = true;
       
        setTimeout(() => {
          this.copyActive = false;
        }, 3000)
      })
      .catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  }
  close() {
    this.copyActive = false;
  }

}

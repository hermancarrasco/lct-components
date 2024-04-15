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

  copyToClipboard() {
    const input = document.createElement("input");
    input.setAttribute("value", this.message);
    input.setAttribute('inputMode', 'none');
    document.body.appendChild(input);
    console.error('Se Copia al portapapeles: ', input.value);//CONSOLE PARA DEBUG
    if (input.value !== '') {
      this.copyActive = true;
    }
    setTimeout(() => {

      navigator.clipboard.writeText(input.value)
      .then(() => {
        console.log('Texto copiado al portapapeles!');
      })
      .catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
      });

    });
    
    setTimeout(() => {
      this.copyActive = false;
    }, 3000)
  }

  close() {
    this.copyActive = false;
  }

}

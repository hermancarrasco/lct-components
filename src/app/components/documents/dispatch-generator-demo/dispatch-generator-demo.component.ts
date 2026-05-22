import { Component, ElementRef, ViewChild } from '@angular/core';
import { LctDispatchPdfData } from 'projects/lct-components/src/public-api';

@Component({
  selector: 'app-dispatch-generator-demo',
  templateUrl: './dispatch-generator-demo.component.html',
  styleUrls: ['./dispatch-generator-demo.component.scss'],
  standalone: false
})
export class DispatchGeneratorDemoComponent {
  @ViewChild('dispatchDocumentHost')
  dispatchDocumentHost?: ElementRef<HTMLElement>;

  readonly dispatchPdfData: LctDispatchPdfData = {
    dispatchConfirmedId: 'CL998877665544',
    nodeName: 'CD Pudahuel',
    securityNumber: 'SEAL-12345',
    tractorNumber: 'ABCD-12',
    deck: '03',
    logisticOperator: 'Falabella Transportes',
    dispatchEmail: 'usuario@falabella.com',
    dispatchedDate: '20/05/2026 12:15',
    packageCount: 24
  };

  generateDocument() {
    const host = this.dispatchDocumentHost?.nativeElement;
    const documentElement = host?.querySelector('#document_container') as HTMLElement | null;

    if (!documentElement) {
      return;
    }

    window.print();
  }
}

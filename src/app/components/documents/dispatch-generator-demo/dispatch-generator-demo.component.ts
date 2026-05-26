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

  // readonly dispatchPdfData: LctDispatchPdfDataq = {
  //   dispatchConfirmedId: 'CL998877665544',
  //   nodeName: 'CD Pudahuel',
  //   securityNumber: 'SEAL-12345',
  //   tractorNumber: 'ABCD-12',
  //   deck: '03',
  //   logisticOperator: 'Falabella Transportes',
  //   dispatchEmail: 'usuario@falabella.com',
  //   dispatchedDate: '20/05/2026 12:15',
  //   packageCount: 24
  // };

  readonly dispatchPdfData: LctDispatchPdfData = {
    country: 'CL',
    fleet: 'Falabella Transportes',
    numberPackages: 24,
    nodeName: 'CD Pudahuel',
    operationType: 'Entregas Fallidas',
    userName: 'Juan Perez',
    userEmail: 'juan.perez@falabella.com',
    dispatchConfirmedId: 'CL998877665544',
    transportInfo: {
      driverDni: '12345678-9',
      driverName: 'Pedro Gonzalez',
      carrierDni: '76543210-1',
      securityNumber: 'SEAL-12345',
      plate: 'LLLD12',
      deck: '123',
      lessInfo: false
    },
    date: '2026-05-26T10:30:00.000Z'
  };

  readonly dispatchPdfExample = JSON.stringify(this.dispatchPdfData, null, 2);

  generateDocument() {
    const host = this.dispatchDocumentHost?.nativeElement;
    const documentElement = host?.querySelector('#document_container') as HTMLElement | null;

    if (!documentElement) {
      return;
    }

    window.print();
  }
}

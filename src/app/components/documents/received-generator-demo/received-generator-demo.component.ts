import { Component, ElementRef, ViewChild } from '@angular/core';
import { LctReceptionPdfData } from 'projects/lct-components/src/public-api';

@Component({
  selector: 'app-received-generator-demo',
  templateUrl: './received-generator-demo.component.html',
  styleUrls: ['./received-generator-demo.component.scss'],
  standalone: false
})
export class ReceivedGeneratorDemoComponent {
  @ViewChild('receivedDocumentHost')
  receivedDocumentHost?: ElementRef<HTMLElement>;

  // readonly receivePdfData: LctReceptionPdfData = {
  //   receiveConfirmedId: 'CL1779292292409',
  //   nodeName: 'CD Pudahuel',
  //   tractorNumber: 'ABCD-12',
  //   deck: '03',
  //   receptionDate: '20/05/2026 10:30',
  //   receptionEmail: 'usuario@falabella.com',
  //   packagesTotalCount: 18,
  //   receiveCount: 8,
  //   discrepancyCount: 2,
  //   cancelledCount: 1,
  //   wrongStoreCount: 1,
  //   anulledCount: 0,
  //   packages: [
  //     {
  //       reason: 'EMPTY_BOX',
  //       lpn: [{ packageLpnValue: '100001' }]
  //     },
  //     {
  //       reason: 'WRONG_STORE',
  //       lpn: [{ packageLpnValue: '100002' }],
  //       isWrongStore: true
  //     }
  //   ]
  // };

  readonly receivePdfData: LctReceptionPdfData = {
    "numberPackages":4,
    "detail":{
      "ok":3,
      "cancelled":0,
      "wrongStore":0,
      "noInformation":1,
      "disagreed":1,
      "packageUnknownDisagreed":0,
      "annulled":1
    },
    "disagreePackageList":[
      {
          "taskId":"5c4591d4-676d-4b44-bc92-7dd291b88dd4",
          "lpn":"122334564350560407",
          "nodeName":"SODIMAC HOMECENTER LOS DOMINICOS",
          "status":"RECEIVED",
          "packageId":"15e3d43c-3c5e-4290-9adb-c871497103d0",
          "sellerId":1,
          "packageStatus":"RECEIVED",
          "reason":"EMPTY_BOX",
          "selected":false,
          "packageNew":false,
          "showIconCopy":false,
          "receiveConfirmedId":"CL1779312825271",
          "estimatedArrivalTime":"2026-04-30T21:55:24.884Z",
          "dataType":"RECEIVEANDDISPATCH",
          "hasPhoto":false
      }
    ],
    "country":"CL",
    "tractorNumber":"",
    "deckNumber":"",
    "nodeName":"SODIMAC LOS DOMINICOS",
    "userName":"not-set",
    "userEmail":"not-set@falabella.cl",
    "receiveConfirmedId":"CL1779312557298",
    "date":"2026-05-20T21:30:57.701Z"
  }

  readonly receivePdfExample = JSON.stringify(this.receivePdfData, null, 2);

  generateDocument() {
    const host = this.receivedDocumentHost?.nativeElement;
    const documentElement = host?.querySelector('#document_container') as HTMLElement | null;

    if (!documentElement) {
      return;
    }

    window.print();
  }
}

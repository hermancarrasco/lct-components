import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from "rxjs";

export type ManualInputAlertType = 'keyboard' | 'laser';

export interface ModalManualInputAlertData {
  finish: boolean;
  type?: ManualInputAlertType;
}

@Component({
  selector: 'lct-modal-manual-input-alert',
  templateUrl: './modal-manual-input-alert.component.html',
  styleUrls: ['./modal-manual-input-alert.scss']
})
export class ModalManualInputAlertComponent implements OnInit {

  @Input() widthModalConfig: string = '100px';
  @Input() heightModalConfig: string = '100px';
  @Input() alertIconPath: string = 'assets/img/ico-tit-alerta.svg';
  closeModalStore: BehaviorSubject<ModalManualInputAlertData> = new BehaviorSubject<ModalManualInputAlertData>({finish: false, type: 'keyboard'});
  constructor() { }

  ngOnInit(): void {
    
  }
  cerrarModal() {
    this.closeModalStore.next({finish: false});
  }

  clickButtonAlert(type: ManualInputAlertType) {
    this.closeModalStore.next({finish: true, type: type});
  }
}

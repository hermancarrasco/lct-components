import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
@Component({
  selector: 'lct-modal',
  templateUrl: './modal-change-store.component.html',
  styleUrls: ['./modal-change-store.scss']
})
export class ModalChangeStoreComponent implements OnInit {
  modalOpen = false;

  @Input() widthModalConfig: string = '100px';
  @Input() heightModalConfig: string = '100px';
  @Input() icon: any;
  @Input() titleModal: string = '';
  @Input() tiendas: any;
  @Output() sendSelectStore = new EventEmitter<string>();
  closeModalStore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  storeSelect: any;
  buttonDisable = false;
  tipoBoton: any;
  stores:any =[];
  constructor() { }

  ngOnInit(): void {
    this.tiendas.forEach((element: any) => {
      this.stores.push(element.nodeName);
    });
    this.tipoBoton = 'primary';
    if (this.storeSelect != '') {
      this.buttonDisable = true;
    }
  }
  cerrarModal() {
    this.closeModalStore.next(true);
  }

  orderCard(evento: any) {
    this.buttonDisable = true;
    this.storeSelect = this.tiendas.filter((str:any) => str.nodeName === evento);
  }

  selectStore() {
    sessionStorage.setItem('nodeName',this.storeSelect[0].nodeName);
    sessionStorage.setItem('nodeId',this.storeSelect[0].nodeId);
    this.sendSelectStore.emit(this.storeSelect);
    this.closeModalStore.next(true);
  }

}

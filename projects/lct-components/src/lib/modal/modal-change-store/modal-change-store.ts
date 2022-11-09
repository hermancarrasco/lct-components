import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
@Component({
  selector: 'lct-modal',
  templateUrl: './modal-change-store.component.html',
  styleUrls: ['./modal-change-store.scss']
})
export class ModalChangeStoreComponent implements OnInit {

  @Input() widthModalConfig: string = '100px';
  @Input() heightModalConfig: string = '100px';
  @Input() icon: string ='';
  @Input() titleModal: string = '';
  @Input() tiendas:{ nodeName: string, nodeId: string }[] = [];
  @Output() sendSelectStore = new EventEmitter<string>();
  closeModalStore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  storeSelect:{ nodeName: string, nodeId: string } | undefined = undefined;
  buttonDisable = false;
  storeName : string[] =[];
  constructor() { }

  ngOnInit(): void {
    this.tiendas.forEach((element: any) => {
      this.storeName.push(element.nodeName);
    });
    if (!this.storeSelect) {
      this.buttonDisable = true;
    }
  }
  cerrarModal() {
    this.closeModalStore.next(true);
  }

  selectedValue(evento: string) {
    this.buttonDisable = false;
    this.storeSelect = this.tiendas.find((str:any) => str.nodeName === evento);
  }

  selectStore() {
    if(!this.buttonDisable){
      sessionStorage.setItem('storeSelected',JSON.stringify(this.storeSelect))
      this.closeModalStore.next(true);
    }

  }

}

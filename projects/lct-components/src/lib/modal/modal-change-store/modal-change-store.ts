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
  @Input() tiendas: { nodeName: string, nodeId: string }[] = [];
  @Output() sendSelectStore = new EventEmitter<string>();
  closeModalStore: BehaviorSubject<{change :boolean | undefined}> = new BehaviorSubject<{change :boolean | undefined}>({change :undefined});
  storeSelect: { nodeName: string, nodeId: string } | undefined = undefined;
  buttonDisable = false;
  storeName: string[] = [];
  closeIcon = false;
  constructor() { }

  ngOnInit(): void {

    this.checkStoreSelected();

    this.tiendas.forEach((element: any) => {
      this.storeName.push(element.nodeName);
    });
    if (!this.storeSelect) {
      this.buttonDisable = true;
    }
  }
  cerrarModal() {
    this.closeModalStore.next({change: false});
  }

  selectedValue(evento: string) {
    this.buttonDisable = false;
    this.storeSelect = this.tiendas.find((str: any) => str.nodeName === evento);
  }

  selectStore() {
    if (!this.buttonDisable) {
      const storeSelected = sessionStorage.getItem('storeSelected');
      console.log('store selec', storeSelected);
      if (storeSelected) {
        const storeSelectedJson: { nodeName: string, nodeId: string } | undefined = JSON.parse(storeSelected)
        if (storeSelectedJson?.nodeId === this.storeSelect?.nodeId) {
          this.closeModalStore.next({change :false});
          return;
        }else{
          sessionStorage.setItem('storeSelected', JSON.stringify(this.storeSelect))
          this.closeModalStore.next({change :true});
        }
      }else{
        sessionStorage.setItem('storeSelected', JSON.stringify(this.storeSelect))
        this.closeModalStore.next({change :true});
      }
     
    }

  }

  checkStoreSelected() {
    this.closeIcon = !!sessionStorage.getItem('storeSelected');
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalChangeStoreComponent } from 'projects/lct-components/src/lib/modal/modal-change-store/modal-change-store';
import { ACCESSFILTER, TIENDAS } from 'src/app/mocks/stores.mock';



@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit  {

  // tiendas = [{ nodeName: 'hola', nodeId: '1' },{ nodeName: 'hola como estas', nodeId: '2' }]
  tiendas = ACCESSFILTER;
  openModalSelectStore = true;
  showChangeStore = true;
  userId='123123123';
  country = 'CL';

  constructor() { }

  ngOnInit(): void {
  }

  changeNode(evento:Boolean){
    console.log('cambio de tienda',evento);
  }
  openModalChangeNode(evento:boolean){
    console.log("Abrir modal", evento)//Desactivar autofocus
  }
  closeModal(even:boolean){
    console.log('cierro modal?', even);
  }

}

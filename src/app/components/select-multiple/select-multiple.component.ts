import { Component, OnInit } from '@angular/core';
import {
  IListLCTSelectMultiple
} from "../../../../projects/lct-components/src/lib/select-multiple/select-multiple.component";

@Component({
  selector: 'app-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss'],
  standalone: false
})
export class SelectMultipleComponent implements OnInit {
  switchValue = false;
  list: IListLCTSelectMultiple[];
  optionsNodos: IListLCTSelectMultiple[];

  constructor() {
    this.list =
      [
        {name : 'J1001 - Jeans Mujer' , checked : false, value: 'RELABEL_PENDING',quantity:10},
        {name : 'J1002 - Jeans Hombre' , checked : false, value: 'READY_TO_DISPATCH', disabled: true,quantity:10},
        {name : 'T1001 - Consolas' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'T1002 - Juegos consolas' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'T1002 - Juegos para cualquier tipo de consola' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
        {name : 'O1001 - Otro 1' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'O1002 - Otro 2' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
        {name : 'O1003 - Otro 3' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},

      ];
    
    this.optionsNodos =
      [
        {name : 'Todos los Nodos' , checked : false, value: 'all'},
        {name : 'Tienda 1' , checked : false, value: 'tienda'},
        {name : 'Tienda 2' , checked : false, value:  'tienda'},
        {name : 'Tienda con nombre super largo para probar tooltip', checked : false, value: 'tienda'},
        {name : 'Tienda 4' , checked : false, value: 'tienda'},
        {name : 'Tienda 5' , checked : false, value: 'tienda'},
        {name : 'Tienda con nombre super largo para probar tooltip' , checked : false, value: 'tienda'},
      ];
  }

  ngOnInit(): void {
  }

  shareCheckedList(item:any[]){
    // console.log(item);
  }

  setAutofocus(autofocus:any){
    // console.log("autofocus-multiple",autofocus);
  }

  shareIndividualCheckedList(item:{}){
    // console.log(item);
  }

    allNodesSelected: boolean = false;

   checkedNodesList(event: IListLCTSelectMultiple[]) {
    const selected = event.find((e) => e.name);
    const nodeAllSelected = this.optionsNodos.find((node: any) => node.value === 'all')!;
    if (nodeAllSelected?.checked && !this.allNodesSelected && selected?.value === 'all') {
      this.allNodesSelected = true;
      this.optionsNodos.forEach((node: any) => {
        node.checked = true;
      });
    }
    if (!nodeAllSelected?.checked && this.allNodesSelected) {
      this.allNodesSelected = false;
      this.optionsNodos.forEach((node: any) => {
        node.checked = false;
      });
    }
    if (
      this.allNodesSelected &&
      this.optionsNodos
        .filter((node: any) => node.value !== 'all')
        .some((node: any) => !node.checked)
    ) {
      this.allNodesSelected = false;
      nodeAllSelected.checked = false;
    }
    if (
      !this.allNodesSelected &&
      this.optionsNodos
        .filter((node: any) => node.value !== 'all')
        .every((node: any) => node.checked)
    ) {
      this.allNodesSelected = true;
      nodeAllSelected.checked = true;
    }
  }

}

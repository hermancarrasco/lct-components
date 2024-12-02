import { Component, OnInit } from '@angular/core';
import {
  IListLCTSelectMultiple
} from "../../../../projects/lct-components/src/lib/select-multiple/select-multiple.component";

@Component({
  selector: 'app-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss']
})
export class SelectMultipleComponent implements OnInit {
  switchValue = false;
  list : IListLCTSelectMultiple[];

  constructor() {
    this.list =
      [
        {name : 'J1001 - Jeans Mujer' , checked : false, value: 'RELABEL_PENDING',quantity:10},
        {name : 'J1002 - Jeans Hombre' , checked : false, value: 'READY_TO_DISPATCH', disabled: true,quantity:10},
        {name : 'T1001 - Consolas' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
        {name : 'T1002 - Juegos consolas' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
        {name : 'T1002 - Juegos para cualquier tipo de consola' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
        {name : 'O1001 - Otro 1' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
        {name : 'O1002 - Otro 2' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
        {name : 'O1003 - Otro 3' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},

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

}

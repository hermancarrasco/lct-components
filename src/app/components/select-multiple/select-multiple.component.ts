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
        {name : 'J1001 - Jeans Mujer' , checked : false, value: 'RELABEL_PENDING'},
        {name : 'J1002 - Jeans Hombre' , checked : false, value: 'READY_TO_DISPATCH', disabled: true},
        {name : 'T1001 - Consolas' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'T1002 - Juegos consolas' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'T1002 - Juegos para cualquier tipo de consola' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'O1001 - Otro 1' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'O1002 - Otro 2' , checked : false, value: 'READY_TO_DISPATCH'},
        {name : 'O1003 - Otro 3' , checked : false, value: 'READY_TO_DISPATCH'},

      ];
  }

  ngOnInit(): void {
  }

  shareCheckedList(item:any[]){
    console.log(item);
  }

  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

}

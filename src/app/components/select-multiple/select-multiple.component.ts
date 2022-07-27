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
        {name : 'Pendiente etiquetado' , checked : false, value: 'RELABEL_PENDING'},
        {name :'Listo para despachar' , checked : false, value: 'READY_TO_DISPATCH'},
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

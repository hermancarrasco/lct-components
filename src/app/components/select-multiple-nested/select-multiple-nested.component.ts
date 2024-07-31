import { Component, OnInit } from '@angular/core';
import {IListSelectMultipleNested} from 'projects/lct-components/src/lib/select-multiple-nested/select-multiple-nested.component';

@Component({
  selector: 'app-select-multiple-nested',
  templateUrl: './select-multiple-nested.component.html',
  styleUrls: ['./select-multiple-nested.component.scss']
})
export class SelectMultipleNestedComponent implements OnInit {
  switchValue = false;
  list : IListSelectMultipleNested[] = [];

  constructor() {
    this.list = [
      {
        name : 'metropolitana',
        listOptions : [
          {name : 'LAS CONDES' , checked : false, value: 'LAS CONDES'},
          {name : 'PROVIDENCIA' , checked : false, value: 'PROVIDENCIA', disabled: true},
          {name : 'PUENTE ALTO' , checked : false, value: 'PUENTE ALTO'},
          {name : 'LA PINTANA' , checked : false, value: 'LA PINTANA'},
          {name : 'PUDAHUEL' , checked : false, value: 'PUDAHUEL'},
          {name : 'EL BOSQUE' , checked : false, value: 'EL BOSQUE'},
          {name : 'QUILICURA' , checked : false, value: 'QUILICURA'},
          {name : 'MAIPU' , checked : false, value: 'MAIPU'},
        ],
      },
      {
        name : 'VALPARAÍSO',
        checkedAll: false,
        listOptions : [
          {name : 'CONCÓN' , checked : false, value: 'CONCÓN'},
          {name : 'VALPARAÍSO' , checked : false, value: 'VALPARAÍSO', disabled: true},
          {name : 'QUINTERO' , checked : false, value: 'QUINTERO'},
          {name : 'ALGARROBO' , checked : false, value: 'ALGARROBO'}
        ],
      },
      {
        name : 'Antofagasta',
        listOptions : [
          {name : 'Antofagasta' , checked : false, value: 'Antofagasta'}
        ],
      },
      {
        name : 'COQUIMBO',
        checkedAll: false,
        listOptions : [
          {name : 'LA Serena' , checked : false, value: 'LA Serena'}
        ],
      },
      {
        name : 'Maule',
        checkedAll: false,
        listOptions : [
          {name : 'Maule' , checked : false, value: 'Maule'}
        ],
      },
      {
        name : 'Los lagos',
        checkedAll: false,
        listOptions : [
          {name : 'puerto montt' , checked : false, value: 'puerto montt'}
        ],
      },
      {
        name : 'AYSEN',
        checkedAll: false,
        listOptions : [
          {name : 'Coyhaique' , checked : false, value: 'Coyhaique'}
        ],
      }
    ]
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

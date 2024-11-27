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
        name : 'AYSEN',
        checkedAll: false,
        quantity:10,
        listOptions : [
          {name : 'Coyhaique' , checked : false, value: 'Coyhaique',quantity:10}
        ],
      },
      {
        name : 'Región Metropolitana de Santiago de Chile',
        checkedAll: false,
        quantity:7,
        listOptions : [
          {name : 'Ciudad Capital de Santiago de Chile' , checked : false, value: 'Santiago',quantity:7}
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

  updateList(){
    // this.list = []
    this.list = [
      {
        name : 'metropolitana',
        quantity:10,
        listOptions : [
          {name : 'LAS CONDES' , checked : false, value: 'LAS CONDES',quantity:10},
          {name : 'PROVIDENCIA' , checked : false, value: 'PROVIDENCIA', disabled: true,quantity:10},
          {name : 'PUENTE ALTO' , checked : false, value: 'PUENTE ALTO',quantity:10},
          {name : 'LA PINTANA' , checked : false, value: 'LA PINTANA',quantity:10},
          {name : 'PUDAHUEL' , checked : false, value: 'PUDAHUEL',quantity:10},
          {name : 'EL BOSQUE' , checked : false, value: 'EL BOSQUE',quantity:10},
          {name : 'QUILICURA' , checked : false, value: 'QUILICURA',quantity:10},
          {name : 'MAIPU' , checked : false, value: 'MAIPU',quantity:10}
        ]
      },
      {
        name : 'VALPARAÍSO',
        checkedAll: false,
        quantity:40,
        listOptions : [
          {name : 'CONCÓN' , checked : false, value: 'CONCÓN',quantity:10,},
          {name : 'VALPARAÍSO' , checked : false, value: 'VALPARAÍSO', disabled: true,quantity:10,},
          {name : 'QUINTERO' , checked : false, value: 'QUINTERO',quantity:10,},
          {name : 'ALGARROBO' , checked : false, value: 'ALGARROBO',quantity:10,}
        ],
      },
      {
        name : 'Antofagasta',
        quantity:10,
        listOptions : [
          {name : 'Antofagasta' , checked : false, value: 'Antofagasta',quantity:10}
        ],
      },
      {
        name : 'COQUIMBO',
        checkedAll: false,
        quantity:10,
        listOptions : [
          {name : 'LA Serena' , checked : false, value: 'LA Serena',quantity:10}
        ],
      },
      {
        name : 'Maule',
        checkedAll: false,
        quantity:10,
        listOptions : [
          {name : 'Maule' , checked : false, value: 'Maule',quantity:10}
        ],
      },
      {
        name : 'Los lagos',
        checkedAll: false,
        quantity:10,
        listOptions : [
          {name : 'puerto montt' , checked : false, value: 'puerto montt',quantity:10}
        ],
      },
      {
        name : 'AYSEN',
        checkedAll: false,
        quantity:10,
        listOptions : [
          {name : 'Coyhaique' , checked : false, value: 'Coyhaique',quantity:10}
        ],
      }
    ]
  }

}

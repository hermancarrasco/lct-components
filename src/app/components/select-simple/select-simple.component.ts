import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-simple',
  templateUrl: './select-simple.component.html',
  styleUrls: ['./select-simple.component.scss']
})
export class SelectSimpleComponent implements OnInit {
  array :any = ['Región de Arica','Región de Antofagasta','Metropolitana de Santiago de Chile', 'Región de Valparaíso',
      'Región del Biobio','Región de los Rios','Región de la Araucanía', 'Región de Punta Arenas',
  ]
  sel ='';
  constructor() { }
  
  ngOnInit(): void {
  }
  changeSelect(value: string) {
    // console.log('value change select: ', value)
  }
  setAutofocus(autofocus:boolean){
    // console.log("autofocus",autofocus);
  }
  agregar(){
    this.sel = 'hola mundo'
  }

}

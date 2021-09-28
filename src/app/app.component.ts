import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'designComponents';
  valuesSelect = ['Seleccione una opción', 'Chilexpress', 'Bluex'];
  valuesSelect2 = ['RLO', 'ASD'];
  list : any[];
  list2 : any[];
  disableButton=true;

  constructor() {
    this.list =
      [
        {name :'Falabella',checked : false},
        {name :'Sodimac',checked : false},
        {name :'Tottus',checked : false},
        {name :'Linio',checked : false},
        {name :'Ikea',checked : false},
        {name :'Global Seller Center',checked : false}
      ]
    this.list2 =
      [
        {name :'Falabella',checked : false},
        {name :'Sodimac',checked : false},
        {name :'Tottus',checked : false},
        {name :'Linio',checked : false},
        {name :'Ikea',checked : false},
        {name :'Global Seller Center',checked : false}
      ]
  }

  clickEnIcon() {
    console.log('click icon: ')
  }
  clickButton(){
    console.log('click in button')
  }

  enter(value: string) {
    console.log('enter gatillado: ', value);
  }

  changeSelect(value: string) {
    console.log('value change select: ', value)
  }


  /*
  * select multiple
  * */

  shareCheckedList(item:any[]){
    console.log(item);
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

  /*
* end select multiple
* */
}

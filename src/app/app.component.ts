import {Component, ViewChild} from '@angular/core';
import {IListLCTSelectMultiple} from "../../projects/lct-components/src/lib/select-multiple/select-multiple.component";
import {LoadingComponent} from "../../projects/lct-components/src/lib/loading/loading.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'designComponents';
  valuesSelect = ['Seleccione una opción', 'Chilexpress', 'Bluex'];
  valuesSelect2 = ['RLO', 'ASD'];
  list : IListLCTSelectMultiple[];
  list2 : IListLCTSelectMultiple[];
  disableButton=true;
  switchValue = false;

  @ViewChild('lctLoading') lctLoading!: LoadingComponent;

  value1 = '';

  constructor() {
    this.list =
      [
        {name : 'Pendiente etiquetado' , checked : false, value: 'RELABEL_PENDING'},
        {name :'Listo para despachar' , checked : false, value: 'READY_TO_DISPATCH'},
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

  inputClick() {
    console.log('click en input');
  }

  /*
* end select multiple
* */

  openOverlay() {
    this.lctLoading.show();

    /*setTimeout(()=> {
      this.lctLoading.dismiss();
    }, 2000);*/
  }
}

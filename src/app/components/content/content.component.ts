import {Component, OnInit, ViewChild} from '@angular/core';
import {
  IListLCTSelectMultiple
} from "../../../../projects/lct-components/src/lib/select-multiple/select-multiple.component";
import {LoadingComponent} from "../../../../projects/lct-components/src/lib/loading/loading.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  title = 'designComponents';
  valuesSelect = ['Chilexpress', 'Bluex'];
  valuesSelect2 = ['RLO', 'ASD'];
  list : IListLCTSelectMultiple[];
  list2 : IListLCTSelectMultiple[];
  disableButton = true;
  switchValue = false;

  @ViewChild('lctLoading') lctLoading!: LoadingComponent;

  value1 = '';

  constructor() {
    this.list =
      [
        {name : 'Pendiente etiquetado' , checked : false, value: 'RELABEL_PENDING',quantity:10},
        {name :'Listo para despachar' , checked : false, value: 'READY_TO_DISPATCH',quantity:10},
      ]
    this.list2 =
      [
        {name :'Falabella',checked : false,quantity:10},
        {name :'Sodimac',checked : false,quantity:10},
        {name :'Tottus',checked : false,quantity:10},
        {name :'Linio',checked : false,quantity:10},
        {name :'Ikea',checked : false,quantity:10},
        {name :'Global Seller Center',checked : false,quantity:10}
      ]
  }

  ngOnInit() {
  }

  clickButton(){
    this.value1 = '';
  }


  openOverlay() {
    this.lctLoading.show();

    /*setTimeout(()=> {
      this.lctLoading.dismiss();
    }, 2000);*/
  }

}

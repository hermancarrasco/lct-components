import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lct-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.css']
})
export class SelectMultipleComponent implements OnInit {

  @Input() list: any[] | undefined;
  @Input() title = 'Insert title'
  @Input() disabled = false;
  @Input() showIcon = true;

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();


  checkedList : any[];
  currentSelected : {} | undefined;
  showDropDown = false;

  constructor() {
    this.checkedList = [];
  }

  ngOnInit() {
  }

  getSelectedValue(status:Boolean,value:String){
    if(status){
      this.checkedList.push(value);
    }else{
      console.log(this.list)
      const index = this.checkedList.indexOf(value);
      const indexList = this.list?.findIndex(list => list.name === value);
      this.checkedList.splice(index,1);
      if (indexList! >= 0 ) {
        this.list![indexList!].checked = false;
      }
      console.log(indexList)
    }

    this.currentSelected = {checked : status,name:value};

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    this.shareIndividualStatus();
  }
  shareCheckedlist(){
    this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus(){
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }

  uncheck(value: string) {
    console.log('desmarcar ', value);
    this.getSelectedValue(false, value);
  }

}

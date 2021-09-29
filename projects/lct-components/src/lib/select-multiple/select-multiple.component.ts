import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface IListLCTSelectMultiple {
  name: string;
  checked: boolean;
  value?: string | number;
}

@Component({
  selector: 'lct-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.css']
})
export class SelectMultipleComponent implements OnInit {

  @Input() list: IListLCTSelectMultiple[] | undefined;
  @Input() title = 'Insert title'
  @Input() disabled = false;
  @Input() showIcon = true;

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();



  checkedList : IListLCTSelectMultiple[];
  currentSelected : IListLCTSelectMultiple | undefined;
  showDropDown = false;

  constructor() {
    this.checkedList = [];
  }

  ngOnInit() {
  }

  getSelectedValue(status: boolean,name: string, value? : string | number){
    if(status) {
      if (value) {
        this.checkedList.push({checked : status,name:name, value: value});
      } else {
        this.checkedList.push({checked : status,name:name});
      }
    }else{
      console.log(this.list)
      const index = this.checkedList.findIndex(checked => checked.name === name);
      const indexList = this.list?.findIndex(list => list.name === name);
      this.checkedList.splice(index,1);
      if (indexList! >= 0 ) {
        this.list![indexList!].checked = false;
      }
    }

    if (value) {
      this.currentSelected = {checked : status,name:name, value: value};
    } else {
      console.log('no tiene value')
      this.currentSelected = {checked : status,name:name};
    }

    //share checked list
    this.shareChecked();

    //share individual selected item
    this.shareIndividualStatus();
  }
  shareChecked(){
    this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus(){
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }

  uncheck(name: string, value?: string | number) {
    console.log('desmarcar ', name);
    this.getSelectedValue(false, name, value);
  }

}

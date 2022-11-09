import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
export class SelectMultipleComponent implements OnInit, OnChanges {

  @Input() list: IListLCTSelectMultiple[] | undefined;
  @Input() title = 'Insert title'
  @Input() disabled: 'true'| 'false' | 'disabled'| boolean | '' = 'false';
  @Input() showIcon = true;
  @Input() placeholder = 'Insert placeholder';

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  disabledValue = false;



  checkedList : IListLCTSelectMultiple[];
  currentSelected : IListLCTSelectMultiple | undefined;
  showDropDown = false;

  constructor() {
    this.checkedList = [];
  }

  ngOnInit() {
    this.disabledValue = this.disabled === true || this.disabled == 'true' || this.disabled === '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled'] && !changes['disabled'].firstChange) {
      if (changes['disabled'].currentValue === true || changes['disabled'].currentValue == 'true' || changes['disabled'].currentValue === ''){
        this.disabledValue = true;
      } else {
        this.disabledValue = false;
      }
    }
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
    this.getSelectedValue(false, name, value);
  }

}

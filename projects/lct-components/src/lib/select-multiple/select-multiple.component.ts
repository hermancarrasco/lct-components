import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export interface IListLCTSelectMultiple {
  name: string;
  checked: boolean;
  value?: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'lct-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.css']
})
export class SelectMultipleComponent implements OnInit, OnChanges {

  @Input() list: IListLCTSelectMultiple[] = [];
  @Input() listFiltered: IListLCTSelectMultiple[] = [];
  @Input() title = 'Insert title'
  @Input() disabled: 'true'| 'false' | 'disabled'| boolean | '' = 'false';
  @Input() showIcon = true;
  @Input() placeholder = 'Insert placeholder';
  @Input() placeholderFilter = 'Buscar';
  @Input() quantityToFilter: number = 6;
  @Input() heightOptions: string = '200px';


  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  disabledValue = false;

  iconFinder;
  filter: string = '';

  currentSelected : IListLCTSelectMultiple | undefined;
  showDropDown = false;

  constructor(private sanitizer: DomSanitizer) {
    this.iconFinder = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjE1MDMgMTIuNDE2M0MxMi4yOTUgMTIuMjcxNyAxMi41MTk1IDEyLjI1NTYgMTIuNjgxOSAxMi4zNjgxTDEyLjczOTYgMTIuNDE2M0wxNi40MDYxIDE2LjA4MjhDMTYuNTY4OCAxNi4yNDU1IDE2LjU2ODggMTYuNTA5MyAxNi40MDYxIDE2LjY3MkMxNi4yNjE0IDE2LjgxNjcgMTYuMDM2OSAxNi44MzI4IDE1Ljg3NDUgMTYuNzIwM0wxNS44MTY4IDE2LjY3MkwxMi4xNTAzIDEzLjAwNTZDMTEuOTg3NiAxMi44NDI4IDExLjk4NzYgMTIuNTc5IDEyLjE1MDMgMTIuNDE2M1oiIGZpbGw9IiMyNjQ5QjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi4zOTcxIDUuNTkxOTFDMTAuNDQ0NSAzLjYzOTI5IDcuMjc4NjggMy42MzkyOSA1LjMyNjA2IDUuNTkxOTFDMy4zNzM0NCA3LjU0NDUzIDMuMzczNDQgMTAuNzEwNCA1LjMyNjA2IDEyLjY2M0M3LjI3ODY4IDE0LjYxNTYgMTAuNDQ0NSAxNC42MTU2IDEyLjM5NzEgMTIuNjYzQzE0LjM0OTggMTAuNzEwNCAxNC4zNDk4IDcuNTQ0NTMgMTIuMzk3MSA1LjU5MTkxWk01LjkxNTMyIDEyLjA3MzdDNC4yODgxMyAxMC40NDY1IDQuMjg4MTMgNy44MDgzNSA1LjkxNTMyIDYuMTgxMTZDNy41NDI1IDQuNTUzOTggMTAuMTgwNyA0LjU1Mzk4IDExLjgwNzkgNi4xODExNkMxMy40MzUxIDcuODA4MzUgMTMuNDM1MSAxMC40NDY1IDExLjgwNzkgMTIuMDczN0MxMC4xODA3IDEzLjcwMDkgNy41NDI1IDEzLjcwMDkgNS45MTUzMiAxMi4wNzM3WiIgZmlsbD0iIzI2NDlCNiIvPgo8L3N2Zz4K`);
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

  getListChecked(): IListLCTSelectMultiple[] {
    return this.list.filter((o => { return o.checked === true }))
  }

  getSelectedValue(status: boolean,name: string, value? : string | number){
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
    this.shareCheckedList.emit(this.getListChecked());
  }
  shareIndividualStatus(){
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }

  uncheck(name: string, value?: string | number) {
    this.getSelectedValue(false, name, value);
  }

  cleanSelecteds() {
    this.list = this.list?.map((item) =>{
      return {name: item.name, value: item.value, checked: false};
    })
  }

  filterData(value:string){
    if (!value){
      return;
    }
    this.listFiltered = this.list.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }
}

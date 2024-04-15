import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export interface IListLCTSelect {
  name: string;
  checked: boolean;
  value?: string | number;
}
@Component({
  selector: 'lct-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnChanges {

  @Input() options = ['Insert Values as string array'];
  @Input() sort: 'asc' | 'desc' | undefined = undefined; //Indica si el array se debe ordenar, 'asc' o 'desc'
  @Input() title = 'Insert title'
  @Input() disabled: 'true'| 'false' | 'disabled'| boolean | '' = 'false';
  @Input() showIcon = true;
  @Input() placeholder = 'Insert placeholder';
  @Input() quantityToFilter: number = 7;
  @Output() value = new EventEmitter<string>();

  filterStore = '';
  filteredOptions:string[]=[];
  disabledValue = false;
  selected : string;
  showDropDown = false;

  iconFinder;
  constructor( private sanitizer: DomSanitizer) {
    this.selected = '';
    this.iconFinder = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjE1MDMgMTIuNDE2M0MxMi4yOTUgMTIuMjcxNyAxMi41MTk1IDEyLjI1NTYgMTIuNjgxOSAxMi4zNjgxTDEyLjczOTYgMTIuNDE2M0wxNi40MDYxIDE2LjA4MjhDMTYuNTY4OCAxNi4yNDU1IDE2LjU2ODggMTYuNTA5MyAxNi40MDYxIDE2LjY3MkMxNi4yNjE0IDE2LjgxNjcgMTYuMDM2OSAxNi44MzI4IDE1Ljg3NDUgMTYuNzIwM0wxNS44MTY4IDE2LjY3MkwxMi4xNTAzIDEzLjAwNTZDMTEuOTg3NiAxMi44NDI4IDExLjk4NzYgMTIuNTc5IDEyLjE1MDMgMTIuNDE2M1oiIGZpbGw9IiMyNjQ5QjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi4zOTcxIDUuNTkxOTFDMTAuNDQ0NSAzLjYzOTI5IDcuMjc4NjggMy42MzkyOSA1LjMyNjA2IDUuNTkxOTFDMy4zNzM0NCA3LjU0NDUzIDMuMzczNDQgMTAuNzEwNCA1LjMyNjA2IDEyLjY2M0M3LjI3ODY4IDE0LjYxNTYgMTAuNDQ0NSAxNC42MTU2IDEyLjM5NzEgMTIuNjYzQzE0LjM0OTggMTAuNzEwNCAxNC4zNDk4IDcuNTQ0NTMgMTIuMzk3MSA1LjU5MTkxWk01LjkxNTMyIDEyLjA3MzdDNC4yODgxMyAxMC40NDY1IDQuMjg4MTMgNy44MDgzNSA1LjkxNTMyIDYuMTgxMTZDNy41NDI1IDQuNTUzOTggMTAuMTgwNyA0LjU1Mzk4IDExLjgwNzkgNi4xODExNkMxMy40MzUxIDcuODA4MzUgMTMuNDM1MSAxMC40NDY1IDExLjgwNzkgMTIuMDczN0MxMC4xODA3IDEzLjcwMDkgNy41NDI1IDEzLjcwMDkgNS45MTUzMiAxMi4wNzM3WiIgZmlsbD0iIzI2NDlCNiIvPgo8L3N2Zz4K`);
  }

  ngOnInit() {
    this.disabledValue = this.disabled === true || this.disabled == 'true' || this.disabled === '';
    this.filteredOptions=this.options;
    if(this.sort){
      this.sortData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled'] && !changes['disabled'].firstChange) {
      if (changes['disabled'].currentValue === true || changes['disabled'].currentValue == 'true' || changes['disabled'].currentValue === ''){
        this.disabledValue = true;
      } else {
        this.disabledValue = false;
      }
    }
    if (changes['options'] && !changes['options'].firstChange) {
      this.filteredOptions=this.options=changes['options'].currentValue;
      if(this.sort){
        this.sortData();
      }
    }
  }

  filterData(value:string){
    this.filteredOptions=this.options.filter(opt=>opt.toLowerCase().includes(value.toLowerCase()));
  }
  sortData(){
    this.filteredOptions.sort((a: string, b: string) => {
      if(a?.toLowerCase() > b?.toLowerCase()) { return this.sort==='asc'? 1:-1; }
      if(a?.toLowerCase() < b?.toLowerCase()) { return this.sort==='asc'? -1:1; }
      return 0;
    });
  }

  changeValue(value: string) {
    this.selected = value;
    this.showDropDown = false;
    this.value.emit(this.selected);
  }
}

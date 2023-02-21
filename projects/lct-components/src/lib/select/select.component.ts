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
  @Input() title = 'Insert title'
  @Input() disabled: 'true'| 'false' | 'disabled'| boolean | '' = 'false';
  @Input() showIcon = true;
  @Input() placeholder = 'Insert placeholder';
  @Output() value = new EventEmitter<string>();

  filterStore = '';
  filteredOptions:string[]=[];
  disabledValue = false;
  selected : string;
  showDropDown = false;

  constructor() {
    this.selected = '';
  }

  ngOnInit() {
    this.disabledValue = this.disabled === true || this.disabled == 'true' || this.disabled === '';
    this.filteredOptions=this.options;
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

  filterData(value:string){
    this.filteredOptions=this.options.filter(opt=>opt.toLowerCase().includes(value.toLowerCase()));
  }

  changeValue(value: string) {
    this.selected = value;
    this.showDropDown = false;
    this.value.emit(this.selected);
  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

export interface ILCTSelectMultiple {
  name: string;
  checked: boolean;
  value?: string | number;
  disabled?: boolean | string;
  secondaryValue?: string | number;
  quantity:number;
}

export interface IListSelectMultipleNested {
  name: string;
  checkedAll?: boolean;
  listOptions: ILCTSelectMultiple[];
  disabled?: boolean | string;
  open?: boolean;
  quantity:number;
}

@Component({
  selector: 'lct-select-multiple-nested',
  templateUrl: './select-multiple-nested.component.html',
  styleUrls: ['./select-multiple-nested.component.css']
})
export class SelectMultipleNestedComponent implements OnInit, OnChanges  {

  @Input() list: IListSelectMultipleNested[] = [];
  listFiltered: IListSelectMultipleNested[] = [];
  @Input() title = 'Insert title'
  @Input() disabled: 'true'| 'false' | 'disabled'| boolean | '' = 'false';
  @Input() showIcon = true;
  @Input() placeholder = 'Insert placeholder';
  @Input() placeholderFilter = 'Buscar';
  @Input() quantityToFilter: number = 6;
  @Input() heightOptions: string = '200px';
  @Input() id?: string = ''; // ID en Button Opcional
  
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  @Output() setAutofocusEvent = new EventEmitter<boolean>();
  disabledValue = false;

  iconFinder;
  filter: string = '';

  currentSelected : ILCTSelectMultiple | null = null;
  showDropDown = false;
  searchValue: string = '';

  // Propiedad calculada para generar el id dinámico
  get selectId(): string | null {
    return this.id ? `select-${this.id}` : null;
  }
  constructor(private sanitizer: DomSanitizer) {
    this.iconFinder = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMCAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjE1MDMgMTIuNDE2M0MxMi4yOTUgMTIuMjcxNyAxMi41MTk1IDEyLjI1NTYgMTIuNjgxOSAxMi4zNjgxTDEyLjczOTYgMTIuNDE2M0wxNi40MDYxIDE2LjA4MjhDMTYuNTY4OCAxNi4yNDU1IDE2LjU2ODggMTYuNTA5MyAxNi40MDYxIDE2LjY3MkMxNi4yNjE0IDE2LjgxNjcgMTYuMDM2OSAxNi44MzI4IDE1Ljg3NDUgMTYuNzIwM0wxNS44MTY4IDE2LjY3MkwxMi4xNTAzIDEzLjAwNTZDMTEuOTg3NiAxMi44NDI4IDExLjk4NzYgMTIuNTc5IDEyLjE1MDMgMTIuNDE2M1oiIGZpbGw9IiMyNjQ5QjYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi4zOTcxIDUuNTkxOTFDMTAuNDQ0NSAzLjYzOTI5IDcuMjc4NjggMy42MzkyOSA1LjMyNjA2IDUuNTkxOTFDMy4zNzM0NCA3LjU0NDUzIDMuMzczNDQgMTAuNzEwNCA1LjMyNjA2IDEyLjY2M0M3LjI3ODY4IDE0LjYxNTYgMTAuNDQ0NSAxNC42MTU2IDEyLjM5NzEgMTIuNjYzQzE0LjM0OTggMTAuNzEwNCAxNC4zNDk4IDcuNTQ0NTMgMTIuMzk3MSA1LjU5MTkxWk01LjkxNTMyIDEyLjA3MzdDNC4yODgxMyAxMC40NDY1IDQuMjg4MTMgNy44MDgzNSA1LjkxNTMyIDYuMTgxMTZDNy41NDI1IDQuNTUzOTggMTAuMTgwNyA0LjU1Mzk4IDExLjgwNzkgNi4xODExNkMxMy40MzUxIDcuODA4MzUgMTMuNDM1MSAxMC40NDY1IDExLjgwNzkgMTIuMDczN0MxMC4xODA3IDEzLjcwMDkgNy41NDI1IDEzLjcwMDkgNS45MTUzMiAxMi4wNzM3WiIgZmlsbD0iIzI2NDlCNiIvPgo8L3N2Zz4K`);
  }

  ngOnInit() {
    this.listFiltered = [...this.list];
    // console.log(this.listFiltered);
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
    if(changes['list']){
      if(Array.isArray(changes['list'].currentValue)){
        this.list = changes['list'].currentValue;
        this.applyFilter();
      }
    }
  }

  getListChecked(): ILCTSelectMultiple[] {
    return this.listFiltered.reduce((accumulator: ILCTSelectMultiple[], category) => {
      const checkedOptions = category.listOptions.filter(option => option.checked);
      return accumulator.concat(checkedOptions);
    }, []);
  }

  getTotalCategoryCount(): number {
    let totalCount = 0;

    for (const _category in this.list) {
      totalCount += 1;
    }

    return totalCount;
  }

  getCategories(): string[] {
    return Object.keys(this.list);
  }

  toggleCategory(category: IListSelectMultipleNested): void {
    category.open = !category.open;
  }

  shareChecked(): void {
    this.shareCheckedList.emit(this.getListChecked());
  }

  shareIndividualStatus(): void {
    if (this.currentSelected) {
      this.shareIndividualCheckedList.emit(this.currentSelected);
    }
  }

  toggleAllOptions(category: IListSelectMultipleNested): void {
    //category.checkedAll = !category.checkedAll;
    category.listOptions.forEach(option => {
      if (!option.disabled) {
        option.checked = category.checkedAll || false;
      }
    });
    this.shareChecked();
  }

  toggleOption(category: IListSelectMultipleNested | null, option: ILCTSelectMultiple): void {
    if (category) {
      category.checkedAll = category.listOptions.filter(option => !option.disabled).every(option => option.checked);
      this.currentSelected = option;
      this.shareIndividualStatus();
      this.shareChecked();
    }
  }

  discardOption(category: IListSelectMultipleNested | null, option: ILCTSelectMultiple):void {
    this.showDropDown = !this.showDropDown;
    if (category) {
      option.checked = false;
      category.checkedAll = category.listOptions.every(option => option.checked);
      this.currentSelected = option;
      this.shareIndividualStatus();
      this.shareChecked();
    }
  }

  // Método para filtrar los datos basados en el nombre de las opciones
  filterData(value: string): IListSelectMultipleNested[] {
    if (!value) {
      return this.list; // Retorna la lista completa si no hay valor de búsqueda
    }

    // Filtra cada categoría y sus opciones
    return this.list.map(category => {
      const filteredOptions = category.listOptions.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );

      return {
        ...category,
        listOptions: filteredOptions
      };
    }).filter(category => category.listOptions.length > 0);
  }

  applyFilter(): void {
    this.listFiltered = this.filterData(this.searchValue);  // Actualiza la lista filtrada
  }


  findOptionCategory(option: ILCTSelectMultiple): IListSelectMultipleNested | null {
    for (let category of this.list) {
      if (category.listOptions.includes(option)) {
        return category;
      }
    }
    return null; // Retornar null si no se encuentra la categoría
  }

  clickFilterComponent(){
    this.showDropDown=!this.showDropDown;
    //Desactivar autofocus externo cuando se muestra el buscador
    if(this.list.length>=this.quantityToFilter){
      this.setAutofocusEvent?.emit(this.showDropDown);
    }
  }
  leaveComponent(){
    this.showDropDown=false;
    //Desactivar autofocus externo cuando se muestra el buscador
    if(this.list.length>=this.quantityToFilter){
      this.setAutofocusEvent?.emit(this.showDropDown);
    }
  }
}

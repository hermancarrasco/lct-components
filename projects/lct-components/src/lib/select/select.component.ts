import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'lct-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options = ['Insert Values as string array']
  @Input() title = 'Insert title';
  @Input() placeholder = 'Select one option';
  @ViewChild('select') select: ElementRef | undefined;
  @Output() value = new EventEmitter();
  @ViewChild("myinput") myInputField: ElementRef = new ElementRef('');
  regexTrim = / /g;
  private show = false;

  selected = 'default';

  constructor() { }

  ngOnInit(): void {
  }

  changeValue(value: string) {
    this.value.emit(value);
    this.hideSelect();
  }

  toggleSelect() {
    if (this.show) {
      setTimeout(() => {
        this.select?.nativeElement.blur();
        this.show = false;
      }, 50);
    } else {
      this.show = true;
    }
  }

  hideSelect() {
    if (this.show) {
      this.show = false;
    }
  }

  clickOption(value: string) {
    this.toggleSelect();
  }

  hidenKeyboard() {
    this.myInputField.nativeElement.setAttribute('inputmode', 'none');
    setTimeout(() => {
      this.myInputField.nativeElement.focus();
      this.myInputField.nativeElement.removeAttribute('inputmode');
    }, 100);
  }

}

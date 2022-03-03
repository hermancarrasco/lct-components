import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

@Component({
  selector: 'lct-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  providers: [CUSTOM_SWITCH_CONTROL_VALUE_ACCESSOR]
})
export class SwitchComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() checked: boolean | string = false;
  @Input() disabled: boolean | string = false;
  @ViewChild('checkbox') checkbox: ElementRef | undefined;
  @Output() enterEmitted = new EventEmitter<string>()

  public propagateChange = (_: any) => { };

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if ((this.checked === '' || this.checked === true || this.checked !== 'false') && this.checked !== false) {
      this.renderer.setAttribute(this.checkbox?.nativeElement,'checked', 'checked');
    }
    if ((this.disabled === '' || this.disabled === true || this.disabled !== 'false') && this.disabled !== false) {
      this.renderer.setAttribute(this.checkbox?.nativeElement,'disabled', 'disabled');
    }
  }

  toggle() {
    if (this.checkbox?.nativeElement.checked) {
      this.renderer.setAttribute(this.checkbox?.nativeElement,'checked', 'checked');
    } else {
      this.renderer.removeAttribute(this.checkbox?.nativeElement,'checked');
    }
    this.onKeyUpHandler();
  }

  writeValue(value: any): void {
    console.log('value', value);
    if (typeof value !== 'undefined') {
      this.onKeyUpHandler(value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // console.log('reg touch', fn)
  }

  onKeyUpHandler(event?: KeyboardEvent) {
    this.propagateChange(this.checkbox?.nativeElement.checked);
  }


  enterEmit() {
    this.enterEmitted.emit(this.checkbox?.nativeElement.checked);
  }

}

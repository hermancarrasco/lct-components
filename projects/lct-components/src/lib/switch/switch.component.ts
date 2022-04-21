import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'lct-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SwitchComponent,
    multi: true
  }]
})
export class SwitchComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() checked: boolean | string = false;
  @Input() disabled: boolean | string = false;
  @Output() enterEmitted = new EventEmitter<boolean>()

  public propagateChange = (_: any) => { };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (
      (typeof this.checked === 'string' && (this.checked.toLowerCase() === 'true' || this.checked.toLowerCase() === 'checked' || this.checked === '')) ||
      (typeof this.checked === 'boolean' && this.checked)
    ) {
      console.log('entra al true check');
      this.checked = true;
    } else {
      this.checked = false;
    }
    if (
      (typeof this.disabled === 'string' && (this.disabled.toLowerCase() === 'true' || this.disabled.toLowerCase() === 'disabled' || this.disabled === '')) ||
      (typeof this.disabled === 'boolean' && this.disabled)
    ) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  toggle() {
    this.checked = !this.checked;
    this.onKeyUpHandler();
  }

  writeValue(value: any): void {
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

  onKeyUpHandler(event?: KeyboardEvent | boolean) {
    if (typeof event === 'boolean') {
      this.checked = event;
    }
    this.propagateChange(this.checked);
  }

  enterEmit() {
    this.enterEmitted.emit(<boolean>this.checked);
  }

}

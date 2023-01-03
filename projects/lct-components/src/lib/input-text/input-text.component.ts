import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'lct-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputTextComponent,
    multi: true
  }]
})
export class InputTextComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {

  @Input() disabled = false;
  @Input() icon = ''
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() pdaAutoEnter = false;
  @Input() placeholder = '';
  @Input() showIcon = false;
  @Input() title = 'Insert Title';
  @Input() type: 'email' | 'number' | 'text' = 'text';
  @Input() error : boolean = false;
  @Output() enterEmitted = new EventEmitter<string>()
  @Output() iconClick = new EventEmitter();
  @Output() inputClick = new EventEmitter();
  @ViewChild('inputScan') inputScan: ElementRef | undefined;
  @ViewChild('titleRef') titleRef: ElementRef | undefined;
  @ViewChild('iconDiv') iconDiv: ElementRef | undefined;

  inputValue = '';
  public lpnUpdate = new Subject<string>();

  public propagateChange = (_: any) => { };

  constructor(private render: Renderer2) {
    this.lpnUpdate
        .pipe(
          debounceTime(200),
          // distinctUntilChanged() // esto previene que el valor ser repita
        )
        .subscribe(async value => {
          if (value && this.pdaAutoEnter) {
            this.enterEmit();
          } else {
            return;
          }
        });
  }

  ngAfterViewInit() {
    if (this.iconPosition === "left" && this.showIcon) {
      this.render.addClass(this.inputScan?.nativeElement, 'iconLeft')
      this.render.addClass(this.iconDiv?.nativeElement, 'iconLeft')
    }
    if (this.error) {
      this.render.addClass(this.inputScan?.nativeElement, 'error');
      this.render.addClass(this.titleRef?.nativeElement, 'error');
    }

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['error'] && !changes['error'].firstChange) {
      if (changes.error.currentValue) {
        this.render.addClass(this.inputScan?.nativeElement, 'error');
        this.render.addClass(this.titleRef?.nativeElement, 'error');
      } else {
        this.render.removeClass(this.inputScan?.nativeElement, 'error');
        this.render.removeClass(this.titleRef?.nativeElement, 'error');
      }
    }
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

  onKeyUpHandler(event?: KeyboardEvent | string) {
    if (!this.inputValue && typeof event === 'string') {
      this.inputValue = event;
    }
    if (this.inputValue && event === null){
      this.inputValue = '';
    }
    if (this.inputValue && typeof event === 'string' && event==='') {
      this.inputValue = '';
    }
    this.propagateChange(this.inputValue);
  }

  click() {
    if (!this.disabled) {
      this.iconClick.emit('iconClick')
    }
  }

  clickInput( ) {
    if (!this.disabled) {
      this.inputClick.emit('inputClick')
    }
  }

  enterEmit() {
    if (this.inputValue) {
      this.enterEmitted.emit(this.inputValue);
    }
  }

  onPaste(ev: ClipboardEvent) {
    ev.preventDefault();
    const clipboard = ev.clipboardData?.getData('Text');
    if (clipboard) {
      this.writeValue(clipboard);
    }
  }

}

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
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SafeResourceUrl } from '@angular/platform-browser';

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
  @Input() icon: string | SafeResourceUrl = ''
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() pdaAutoEnter = false;
  @Input() placeholder = '';
  @Input() showIcon = false;
  @Input() title = 'Insert Title';
  @Input() type: 'email' | 'number' | 'text' = 'text';
  @Input() error: boolean = false;
  @Input() id?: string = ''; // ID en Button Opcional
  @Output() enterEmitted = new EventEmitter<string>()
  @Output() iconClick = new EventEmitter();
  @Output() inputClick = new EventEmitter();
  @ViewChild('inputScan') inputScan: ElementRef | undefined;
  @ViewChild('titleRef') titleRef: ElementRef | undefined;
  @ViewChild('iconDiv') iconDiv: ElementRef | undefined;

  inputValue = '';
  private selectionStart = 0;
  private selectionEnd = 0;
  public lpnUpdate = new Subject<string>();

  public propagateChange = (_: any) => { };
  
  // Propiedad calculada para generar el id dinámico
  get inputId(): string | null {
    return this.id ? `input-${this.id}` : null;
  }

  constructor(private render: Renderer2) {
    this.lpnUpdate
      .pipe(
        debounceTime(200)
     /*    distinctUntilChanged() */ // esto previene que el valor ser repita
      )
      .subscribe(async value => {
        if (value && this.pdaAutoEnter) {
          this.enterEmit();
        } else {
          if (!value) {
            this.selectionStart = 0
            this.selectionEnd = 0;
          }
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
    if (changes['pdaAutoEnter'] && !changes['pdaAutoEnter'].firstChange) {      
      this.pdaAutoEnter = changes['pdaAutoEnter'].currentValue;
    }
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
    if (this.inputValue && event === null) {
      this.inputValue = '';
    }
    if (this.inputValue && typeof event === 'string' && event === '') {
      this.inputValue = '';
    }
    this.propagateChange(this.inputValue);
  }

  click() {
    if (!this.disabled) {
      this.iconClick.emit('iconClick')
    }
  }

  clickInput() {
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
      if (this.selectionEnd && this.selectionStart === this.inputScan?.nativeElement.selectionStart) {
        const slice1 = this.inputValue.slice(0, this.selectionStart);
        const slice2 = this.inputValue.slice(this.selectionEnd);
        this.inputValue = slice1 + clipboard + slice2;
        setTimeout(() => {
          this.inputScan?.nativeElement.setSelectionRange(slice1.length + clipboard.length, slice1.length + clipboard.length)
        }, 20)
        this.selectionStart = 0;
        this.selectionEnd = 0;
      } else {
        const slice1 = this.inputValue.slice(0, this.inputScan?.nativeElement.selectionStart);
        const slice2 = this.inputValue.slice(this.inputScan?.nativeElement.selectionStart);
        this.inputValue = slice1 + clipboard + slice2;
        setTimeout(() => {
          this.inputScan?.nativeElement.setSelectionRange(slice1.length + clipboard.length, slice1.length + clipboard.length)
        }, 20)
        // this.inputValue = this.inputValue+clipboard;
      }
    }
  }

  selectionChange(ev: any) {
    // console.log('selection asdf:', ev.target.value.substring(ev.target.selectionStart, ev.target.selectionEnd));
    // console.log('start: ',ev.target.selectionStart, 'end:', ev.target.selectionEnd)
    // this.selectedText = ev.target.value.substring(ev.target.selectionStart, ev.target.selectionEnd);
    this.selectionStart = ev.target.selectionStart;
    this.selectionEnd = ev.target.selectionEnd;
  }


}

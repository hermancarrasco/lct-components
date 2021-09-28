import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'lct-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit, AfterViewInit {

  @Input() disabled = false;
  @Input() icon = ''
  @Input() iconPosition : 'left' | 'right' = 'right';
  @Input() pdaAutoEnter = false;
  @Input() placeholder = '';
  @Input() showIcon = false;
  @Input() title = 'Insert Title';
  @Input() type : 'email' | 'number' | 'text' = 'text';
  @Output() enterEmitted = new EventEmitter()
  @Output() iconClick = new EventEmitter();
  @ViewChild('inputScan') inputScan: ElementRef| undefined;
  @ViewChild('iconDiv') iconDiv: ElementRef| undefined;

  inputValue = '';
  public lpnUpdate = new Subject<string>();

  constructor(private render: Renderer2) {
    if (this.pdaAutoEnter) {
      this.lpnUpdate
        .pipe(
          debounceTime(100),
          distinctUntilChanged()
        )
        .subscribe(async value => {
          if (value) {
            this.enterEmit();
          } else {
            return;
          }
        });
    }
  }

  ngAfterViewInit() {
    if (this.iconPosition === "left" && this.showIcon) {
      this.render.addClass(this.inputScan?.nativeElement, 'iconLeft')
      this.render.addClass(this.iconDiv?.nativeElement, 'iconLeft')
    }
  }

  ngOnInit(): void {
  }

  click() {
    if (!this.disabled){
      this.iconClick.emit('iconClick')
    }
  }

  enterEmit() {
    if (this.inputValue){
      this.enterEmitted.emit(this.inputValue);
    }
  }

}

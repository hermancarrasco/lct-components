import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'lct-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() title = 'Insert Title'
  @Input() buttonType: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'error' | 'success' = 'primary'
  @Input() disabled: 'true'| 'false' | 'disabled'| boolean | '' = 'false';
  @Input() icon = '';
  @Input() width = '';
  @Input() height = '';
  @Input() counter: number = -1;
  @ViewChild('button') button: ElementRef | undefined;

  disabledValue = false;


  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
   this.renderButtonType();
    if (this.width) {
      this.renderer.setStyle(this.button?.nativeElement, 'width', this.width);
    }

    if (this.height) {
      this.renderer.setStyle(this.button?.nativeElement, 'height', this.height);
    }
  }

  ngOnInit(): void {
    if (this.disabled=== true || this.disabled == 'true' || this.disabled === ''){
      this.disabledValue = true;
    } else {
      this.disabledValue = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['buttonType'] && !changes['buttonType'].firstChange) {
      this.buttonType = changes.buttonType?.currentValue;
      this.renderer.removeClass(this.button?.nativeElement, changes.buttonType?.previousValue);
      this.renderButtonType();
    } else if (changes['disabled'] && !changes['disabled'].firstChange) {
      console.log('disabled:', changes);
      if (changes['disabled'].currentValue === true || changes['disabled'].currentValue == 'true' || changes['disabled'].currentValue === ''){
        this.disabledValue = true;
      } else {
        this.disabledValue = false;
      }
    }
  }

  renderButtonType() {
    this.renderer.addClass(this.button?.nativeElement, this.buttonType);
  }

}

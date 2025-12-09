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
  @Input() buttonType: 'primary' | 'enabled' | 'secondary' | 'tertiary' | 'quaternary' | 'quintary' | 'sextary' | 'error' | 'success' = 'primary'
  @Input() disabled: 'true' | 'false' | 'disabled'| boolean | '' = 'false';
  @Input() shape: 'normal' | 'round' = 'normal';
  @Input() icon = '';
  @Input() width = '';
  @Input() height = '';
  @Input() bold: 'true' | 'false' | boolean = 'false';
  @Input() iconWidth: number = 30;
  @Input() iconHeight: number = 30;
  @Input() counter: number = -1;
  @Input() id?: string = ''; // ID en Button Opcional
  @ViewChild('button') button: ElementRef | undefined;
  disabledValue = false;
  boldValue = false;

  // Propiedad calculada para generar el id dinámico
  get buttonId(): string | null {
    return this.id ? `btn-${this.id}` : null;
  }

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
    if (this.bold=== true || this.bold == 'true'){
      this.boldValue = true;
    } else {
      this.boldValue = false;
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

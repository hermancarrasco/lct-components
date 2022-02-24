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
export class ButtonComponent implements OnInit, AfterViewInit {
  @Input() title = 'Insert Title'
  @Input() buttonType = 'primary'
  @Input() disabled = false;
  @Input() class = '';
  @Input() icon = '';
  @Input() width = '';
  @Input() height = '';
  @ViewChild('button') button: ElementRef | undefined;


  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.renderer.addClass(this.button?.nativeElement, this.buttonType);
    /*if (this.class) {
      const arr = this.class.split(' ');
      arr.forEach((add) => this.renderer.addClass(this.button?.nativeElement, add));
      // this.renderer.addClass(this.button?.nativeElement, this.class);
    }*/
    if (this.width) {
      this.renderer.setStyle(this.button?.nativeElement, 'width', this.width);
    }

    if (this.height) {
      this.renderer.setStyle(this.button?.nativeElement, 'height', this.height);
    }
  }

  ngOnInit(): void {
  }

}

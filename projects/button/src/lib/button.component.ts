import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'lct-button',
  template: `
    <button #button>{{title}}</button>
  `,
  styles: [
    `
      @media (max-width: 375px) {
        button {
          height: 50px !important;
        }
      }

      button {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #C2C2C2;
        background-color: #C8CCD4;
        font-size: 15px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 18px;

      }

      .primary {
        background-color: #2649B6;
        color: #FFFFFF;
      }

      .secondary {
        background-color: khaki;
      }

    `
  ]
})
export class ButtonComponent implements OnInit, AfterViewInit {

  @Input() title = 'Insert Title'
  @Input() buttonType = 'primary'
  @ViewChild('button') button: ElementRef | undefined;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.button?.nativeElement, this.buttonType);
  }

  ngOnInit(): void {
  }
}

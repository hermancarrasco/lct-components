import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-button-lct',
  templateUrl: './button-lct.component.html',
  styleUrls: ['./button-lct.component.scss']
})
export class ButtonLctComponent implements OnInit, AfterViewInit {

  @Input() title = 'Insert Title'
  @Input() buttonType = 'primary'
  @Input() disabled = false;
  @ViewChild('button') button: ElementRef | undefined;


  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.disabled) {
      this.renderer.addClass(this.button?.nativeElement, 'disabled');
    } else {
      this.renderer.addClass(this.button?.nativeElement, this.buttonType);
    }
  }

  ngOnInit(): void {
  }

}

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
  @ViewChild('button') button: ElementRef | undefined;


  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.renderer.addClass(this.button?.nativeElement, this.buttonType);
  }

  ngOnInit(): void {
  }

}

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'lct-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  standalone: false
})
export class LoadingComponent {

  @ViewChild('overlay') private overlay!: ElementRef;

  constructor() { }

  show() {
    this.overlay.nativeElement.style.display = 'block';
  }

  dismiss() {
    this.overlay.nativeElement.style.display = 'none';
  }


}

import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewInit {

  @Input() options = ['Insert Values as string array']
  @Input() title = 'Insert title';
  @ViewChild('select') select: ElementRef | undefined;
  @Output() value = new EventEmitter();

  private show = false;

  selected = this.options[0];

  constructor() {
  }

  ngAfterViewInit() {
    this.selected = this.options[0];
  }

  ngOnInit(): void {
  }

  changeValue(value: string) {
    this.value.emit(value);
    this.hideSelect();
  }

  toggleSelect() {
    if (this.show) {
      this.select?.nativeElement.blur();
    } else {
      this.show = !this.show;
    }
  }

  hideSelect() {
    if (this.show) {
      this.show=false;
    }
  }


}

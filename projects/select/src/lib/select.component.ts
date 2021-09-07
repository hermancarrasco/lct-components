import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'lct-select',
  template: `
    <div [id]="title">
      <div class="title">{{title}}</div>
      <div class="select-box">
        <div #select
          class="select-box__current"
             tabindex="1"
             (click)="toggleSelect()"
             (blur)="hideSelect()">
          <div class="select-box__value" *ngFor="let option of options; let i = index">
            <input
              class="select-box__input"
              type="radio"
              [id]="title.replace(regexTrim, '')+i"
              [value]="option"
              [name]="title.replace(regexTrim, '')"
              [checked]="i===0"
              [(ngModel)]="selected"
              (ngModelChange)="changeValue(option)"/>
            <p class="select-box__input-text">{{option}}</p>
          </div>
          <img class="select-box__icon" src="https://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon"
               aria-hidden="true"/>
        </div>
        <ul class="select-box__list">
          <li *ngFor="let option of options; let i = index">
            <label class="select-box__option" [for]="title.replace(regexTrim, '')+i" aria-hidden="aria-hidden"
                   (click)="clickOption(option)">{{option}}</label>
          </li>
        </ul>
      </div>
    </div>

  `,
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewInit {

  @Input() options = ['Insert Values as string array']
  @Input() title = 'Insert title';
  @ViewChild('select') select: ElementRef | undefined;
  @Output() value = new EventEmitter();
  regexTrim = / /g;
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
      setTimeout(() => {
        this.select?.nativeElement.blur();
        this.show = false;
      }, 50);
    } else {
      this.show = true;
    }
  }

  hideSelect() {
    if (this.show) {
      this.show = false;
    }
  }

  clickOption(value: string) {
    this.toggleSelect();
  }

}

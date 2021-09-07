import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lct-input-text',
  template: `
    <div class="input-with-icon">
      <input type="text" class="form-control" [placeholder]="placeHolder">
      <div class="icon" *ngIf="showIcon">
        <img [src]="icon" alt="" (click)="click()">
      </div>
    </div>
  `,
  styles: [
    `
      @media (max-width: 375px) {
        .input-with-icon {
          height: 50px !important;
        }
      }

      .input-with-icon {
        box-sizing: border-box;
        position: relative;
        height: 40px;

      }

      .input-with-icon .form-control {
        height: 100%;
        width: 100%;
        border: 1px solid #C2C2C2;
        border-radius: 5px;
        background-color: #E0E5EE;
        box-sizing: border-box;
        font-size: 14px;
        padding: 12px 20px 12px 15px;
      }

      .input-with-icon .icon {
        position: absolute;

        right: 0.5rem;
        top: 0.3rem;
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.3rem;

        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }

      .input-with-icon .icon:hover {
        cursor: pointer;
      }

    `
  ]
})
export class InputTextComponent implements OnInit {
  @Input() showIcon = false;
  @Input() icon = ''
  @Input() placeHolder = '';
  @Output() iconClick = new EventEmitter<string>();

  constructor() {
  }


  ngOnInit(): void {
    console.log('Icon: ', this.icon)
    console.log('this.showIcon: ', this.showIcon)
  }

  click() {
    this.iconClick.emit('iconClick')
  }

}

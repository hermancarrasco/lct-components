import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs";
import {DeviceDetectorService} from "ngx-device-detector";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-input-text2',
  templateUrl: './input-text2.component.html',
  styleUrls: ['./input-text2.component.scss']
})
export class InputText2Component implements OnInit {

  @Input() showIcon = false;
  @Input() icon = ''
  @Input() placeHolder = '';
  @Input() pdaAutoEnter = false;
  @Output() iconClick = new EventEmitter();
  @Output() enterEmitted = new EventEmitter()

  inputValue = '';
  public lpnUpdate = new Subject<string>();

  constructor(private deviceService: DeviceDetectorService) {
    if (deviceService.os === 'Android' && this.pdaAutoEnter) {
      this.lpnUpdate
        .pipe(
          debounceTime(100),
          distinctUntilChanged()
        )
        .subscribe(async value => {
          if (value) {
            console.log('value', value);
            this.enterEmit();
          } else {
            return;
          }
        });
    }
  }

  ngOnInit(): void {
  }

  click() {
    this.iconClick.emit('iconClick')
  }

  enterEmit() {
    this.enterEmitted.emit(this.inputValue);
  }

}

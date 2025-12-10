import { Component } from '@angular/core';
import { ManualInputAlertType } from 'projects/lct-components/src/lib/modal/modal-manual-input-alert/modal-manual-input-alert';

@Component({
  selector: 'app-button-round',
  templateUrl: './button-round.component.html',
  styleUrls: ['./button-round.component.scss']
})
export class ButtonRoundComponent {

  clickButtonEnabled() {
    // console.log('clickButtonEnabled');
  }
  buttonClickAlert(event: ManualInputAlertType) {
    console.log('buttonClickAlert', event);
  }
}

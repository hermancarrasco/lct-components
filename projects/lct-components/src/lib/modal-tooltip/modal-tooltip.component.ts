import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Component({
  selector: 'lct-modal-tooltip',
  templateUrl: './modal-tooltip.component.html',
  styleUrls: ['./modal-tooltip.component.scss']
})
export class ModalTooltipComponent {

  @Input() title: string = '';
  @Input() nodeNameToken: string = '';
  @Output() closeModal = new EventEmitter<any>();
  tooltip = false;

  /* directive version */

  nameStore: string = '-';
  version :string = '-';
  dateVersion :string = '-';
  conditional2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  VerTienda() {
    this.tooltip = true;
  }
  cerrarModal() {
    this.tooltip = false;
    this.conditional2.next(true);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
// import { ToastComponent } from 'projects/lct-components/src/lib/toast/toast.component';
import { ToastService } from 'projects/lct-components/src/lib/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class IToastComponent implements OnInit {
  switchValue = false;

  constructor(
    // private toastComponent: ToastComponent,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  showToast() {
    // this.toastComponent.showToast('This is a custom toast message', 'success');
    this.toastService.showToast('Probando TOAST Primary', 'toastPrimary', 6000);
  }
  showToastWarning() {
    // this.toastComponent.showToast('This is a custom toast message', 'success');
    this.toastService.showToast('ProbandoProbandoProbandoProbando TOAST Warning', 'toastSecondary', 6000);
  }
  showToastError() {
    // this.toastComponent.showToast('This is a custom toast message', 'success');
    this.toastService.showToast('Probando TOAST Error', 'toastError', 6000);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: any[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(toast:any) {
    this.toastService.removeToast(toast);
  }

  ngOnDestroy() {
    this.toastService.clearToasts();  // Opcional: Limpia los toasts al destruir el componente
  }
}

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
    console.log('444444');
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
    console.log('this.toasts', this.toasts);
  }

  removeToast(toast:any) {
    this.toastService.removeToast(toast);
  }

  ngOnDestroy() {
    this.toastService.clearToasts();  // Opcional: Limpia los toasts al destruir el componente
  }
}

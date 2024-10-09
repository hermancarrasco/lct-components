import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastComponent } from './toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<any[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private componentRef: ComponentRef<ToastComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  showToast(message: string, type: string = 'toastPrimary', duration: number = 6000) {

    const toast = { message, type };
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([toast,...currentToasts]);

    if (!this.componentRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
      this.componentRef = factory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      document.body.appendChild(this.componentRef.location.nativeElement);
    }

    setTimeout(() => {
      this.removeToast(toast);
      if (this.toastsSubject.value.length === 0 && this.componentRef) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = null;
      }
    }, duration);
  }

  removeToast(toast:any) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t !== toast));
  }

  clearToasts() {
    this.toastsSubject.next([]);
  }
}

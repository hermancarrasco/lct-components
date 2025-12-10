import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalManualInputAlertComponent } from '../modal/modal-manual-input-alert/modal-manual-input-alert';
import { ManualInputAlertType } from '../modal/modal-manual-input-alert/modal-manual-input-alert.types';

@Component({
  selector: 'lct-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() title = 'Insert Title'
  @Input() buttonType: 'primary' | 'enabled' | 'secondary' | 'tertiary' | 'quaternary' | 'quintary' | 'sextary' | 'error' | 'success' = 'primary'
  @Input() disabled: 'true' | 'false' | 'disabled'| boolean | '' = 'false';
  @Input() shape: 'normal' | 'round' = 'normal';
  @Input() icon = '';
  @Input() width = '';
  @Input() height = '';
  @Input() bold: 'true' | 'false' | boolean = 'false';
  @Input() iconWidth: number = 30;
  @Input() iconHeight: number = 30;
  @Input() counter: number = -1;
  @Input() isMobile: boolean = false;
  @Input() id?: string = ''; // ID en Button Opcional
  @Input() userId?: string = '';
  @Input() alertIconPath?: string = ''; // Ruta del ícono de alerta para el modal
  @Output() alertManualInput: EventEmitter<ManualInputAlertType> = new EventEmitter<ManualInputAlertType>();
  @ViewChild('button') button: ElementRef | undefined;
  disabledValue = false;
  boldValue = false;
  componentRef2: ComponentRef<ModalManualInputAlertComponent> | undefined = undefined;

  // Propiedad calculada para generar el id dinámico
  get buttonId(): string | null {
    return this.id ? `btn-${this.id}` : null;
  }

  constructor(private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

  ngAfterViewInit() {
   this.renderButtonType();
    if (this.width) {
      this.renderer.setStyle(this.button?.nativeElement, 'width', this.width);
    }

    if (this.height) {
      this.renderer.setStyle(this.button?.nativeElement, 'height', this.height);
    }
  }

  ngOnInit(): void {
    if (this.disabled=== true || this.disabled == 'true' || this.disabled === ''){
      this.disabledValue = true;
    } else {
      this.disabledValue = false;
    }
    if (this.bold=== true || this.bold == 'true'){
      this.boldValue = true;
    } else {
      this.boldValue = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['buttonType'] && !changes['buttonType'].firstChange) {
      this.buttonType = changes.buttonType?.currentValue;
      this.renderer.removeClass(this.button?.nativeElement, changes.buttonType?.previousValue);
      this.renderButtonType();
    } else if (changes['disabled'] && !changes['disabled'].firstChange) {
      if (changes['disabled'].currentValue === true || changes['disabled'].currentValue == 'true' || changes['disabled'].currentValue === ''){
        this.disabledValue = true;
      } else {
        this.disabledValue = false;
      }
    }
  }

  renderButtonType() {
    this.renderer.addClass(this.button?.nativeElement, this.buttonType);
  }

  openModalInputAlert() {
    if(!this.userId || this.userId === ''){
      console.log("No es posible configurar modal manual input alert sin parámetro userId");
    }
    const sessionData = localStorage.getItem('alert-manual-input') || '[]';
    const usersAlertData: Array<{ userId: string, timestamp: number }> = sessionData ? JSON.parse(sessionData) : [];
    const currentUser = usersAlertData.find(user => user.userId === this.userId);
    
    // Si el usuario existe y su timestamp es menor a 4 horas, no mostrar el modal
    if(currentUser && currentUser.timestamp > new Date().getTime() - 1000 * 60 * 60 * 4){
      this.alertManualInput.emit('keyboard');
      return;
    }
    
    // Si ya pasaron al menos 4 horas o es un usuario nuevo, ejecutar el modal y actualizar/agregar el timestamp
    const currentTimestamp = new Date().getTime();
    
    if(currentUser) {
      // Actualizar el timestamp del usuario existente
      currentUser.timestamp = currentTimestamp;
    } else {
      // Agregar el nuevo usuario al array
      usersAlertData.push({
        userId: this.userId || '',
        timestamp: currentTimestamp,
      });
    }
    localStorage.setItem('alert-manual-input', JSON.stringify(usersAlertData));

    const componentFactory = this.resolver.resolveComponentFactory(ModalManualInputAlertComponent);
    this.componentRef2 = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef2.instance.widthModalConfig = this.isMobile ? "100%" : '600px';
    this.componentRef2.instance.heightModalConfig = this.isMobile ? "100%" : '320px';
    this.componentRef2.instance.alertIconPath = "src/svg/ico-tit-alerta.svg";
    if (this.alertIconPath) {
      this.componentRef2.instance.alertIconPath = this.alertIconPath;
    }
    
    this.componentRef2.instance.closeModalStore.subscribe(resp => {
      if(resp.finish){
        this.alertManualInput.emit(resp.type);
        this.closeModal();
      }
    })
  }

  onButtonClick(): void {
    // Verificar si el EventEmitter tiene suscriptores (observers)
    // Esto indica si hay un listener en el template padre: (buttonClickAlert)="..."
    const hasSubscribers = this.alertManualInput?.observers?.length > 0;
    
    if(this.buttonType === 'enabled' && hasSubscribers){
      this.openModalInputAlert();
    }
  }
  closeModal(): void {
    if (this.componentRef2) {
      this.componentRef2.destroy();
      this.componentRef2 = undefined;
    }
  }

}

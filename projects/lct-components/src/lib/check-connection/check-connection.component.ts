import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lct-check-connection',
  templateUrl: './check-connection.component.html',
  styleUrls: ['./check-connection.component.scss']
})
export class CheckConnectionComponent implements OnInit, OnDestroy {
  connectionType: string = '';
  showWarning: boolean = false;
  connectionLost: boolean = false;
  showGoodConnection: boolean = false;
  isLocalhost: boolean = false;
  private onlineListener?: () => void;
  private offlineListener?: () => void;
  private connectionChangeListener?: () => void;

  constructor() { }

  ngOnInit(): void {
    this.checkIfLocalhost();
    this.checkConnection();
    this.setupConnectionListeners();
  }

  checkConnection(): void {
    // Verificar si hay conexión a internet
    if (!navigator.onLine) {
      this.connectionLost = true;
      this.showWarning = false;
      this.connectionType = 'offline';
      return;
    }

    // Verificar si el navegador soporta la API de Network Information
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.connectionType = connection.effectiveType || connection.type || 'unknown';
      
      // Mostrar advertencia si la conexión es 3g o peor
      if (this.connectionType === '3g' || this.connectionType === 'slow-2g' || this.connectionType === '2g') {
        this.showWarning = true;
        this.connectionLost = false;
        this.showGoodConnection = false;
      } else {
        this.showWarning = false;
        this.connectionLost = false;
        // Mostrar banner de conexión buena solo en localhost
        this.showGoodConnection = this.isLocalhost;
      }
    } else {
      // Fallback: simular detección básica
      this.connectionType = 'unknown';
      this.showWarning = false;
      this.connectionLost = false;
      // Mostrar banner de conexión buena solo en localhost
      this.showGoodConnection = this.isLocalhost;
    }
  }

  testConnection(): void {
    this.checkConnection();
  }

  private checkIfLocalhost(): void {
    const hostname = window.location.hostname;
    this.isLocalhost = hostname.startsWith('192.168.') ||
                      hostname.startsWith('10.') ||
                      hostname.endsWith('.local');
  }

  private setupConnectionListeners(): void {
    // Listener para cuando se recupera la conexión
    this.onlineListener = () => {
      this.checkConnection();
    };

    // Listener para cuando se pierde la conexión
    this.offlineListener = () => {
      this.checkConnection();
    };

    // Agregar listeners a los eventos del navegador
    window.addEventListener('online', this.onlineListener);
    window.addEventListener('offline', this.offlineListener);

    // Listener para cambios en la calidad de la conexión (si está disponible)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.connectionChangeListener = () => {
        this.checkConnection();
      };
      connection.addEventListener('change', this.connectionChangeListener);
    }
  }

  ngOnDestroy(): void {
    // Limpiar listeners para evitar memory leaks
    if (this.onlineListener) {
      window.removeEventListener('online', this.onlineListener);
    }
    if (this.offlineListener) {
      window.removeEventListener('offline', this.offlineListener);
    }
    if (this.connectionChangeListener && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.removeEventListener('change', this.connectionChangeListener);
    }
  }
}

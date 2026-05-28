import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { createCode39Barcode } from '../received-generator/code39-barcode.util';

export type LctCountryCode = 'CL' | 'CO' | 'PE' | string;

export type LctDispatchTransportInfo = {
  driverDni?: string;
  driverName?: string;
  carrierDni?: string;
  securityNumber?: string;
  plate?: string;
  deck?: string;
  lessInfo?: boolean;
};

export type LctDispatchPdfData = {
  country?: LctCountryCode;
  fleet?: string;
  numberPackages?: number;
  dispatchConfirmedId?: string;
  nodeName?: string;
  operationType?: string;
  userName?: string;
  userEmail?: string;
  transportInfo?: LctDispatchTransportInfo;
  date?: string;
  securityNumber?: string;
  tractorNumber?: string;
  deck?: string;
  logisticOperator?: string;
  dispatchEmail?: string;
  dispatchedDate?: string;
  packageCount?: number;
};

@Component({
  selector: 'dispatch-pdf, lct-dispatch-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dispatch-generator.component.html',
  styleUrl: './dispatch-generator.component.scss'
})
export class LctDispatchGeneratorComponent {
  barcodeBars: Array<{ x: number; width: number }> = [];
  barcodeTotalUnits = 0;
  barcodeHeight = 36;
  barcodeDisplayValue = '';
  barcodeImageDataUrl = '';

  private readonly barcodeOutputWidth = 420;
  private readonly barcodeOutputHeight = 48;
  private readonly barcodeMarginHorizontal = 8;
  private readonly barcodeOffsetY = 6;

  private _dispatchPdf: LctDispatchPdfData | undefined = undefined;

  @Input()
  set dispatchPdf(value: LctDispatchPdfData | undefined) {
    this._dispatchPdf = value;
    this.updateBarcode(value?.dispatchConfirmedId);
  }

  get dispatchPdf() {
    return this._dispatchPdf;
  }

  @Input() country: LctCountryCode = 'CL';

  protected get securityLabel() {
    return this.country === 'CO' ? 'Precinto de seguridad' : 'Sello de seguridad';
  }

  protected get truckPlateLabel() {
    return this.country === 'CO' ? 'Placa camión' : 'Patente camión';
  }

  private updateBarcode(dispatchConfirmedId: string | undefined) {
    const barcode = createCode39Barcode(dispatchConfirmedId);
    this.barcodeDisplayValue = barcode.displayValue;
    this.barcodeBars = barcode.bars;
    this.barcodeTotalUnits = barcode.totalUnits;
    this.barcodeImageDataUrl = this.buildBarcodeImage();
  }

  private buildBarcodeImage() {
    if (this.barcodeBars.length === 0 || this.barcodeTotalUnits === 0 || typeof document === 'undefined') {
      return '';
    }

    const canvas = document.createElement('canvas');
    canvas.width = this.barcodeOutputWidth;
    canvas.height = this.barcodeOutputHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      return '';
    }

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, this.barcodeOutputWidth, this.barcodeOutputHeight);

    const availableWidth = this.barcodeOutputWidth - this.barcodeMarginHorizontal * 2;
    const moduleWidth = Math.max(1, Math.floor(availableWidth / this.barcodeTotalUnits));
    const renderedWidth = this.barcodeTotalUnits * moduleWidth;
    const offsetX = Math.floor((this.barcodeOutputWidth - renderedWidth) / 2);

    context.fillStyle = '#000000';
    this.barcodeBars.forEach(bar => {
      context.fillRect(
        offsetX + bar.x * moduleWidth,
        this.barcodeOffsetY,
        bar.width * moduleWidth,
        this.barcodeHeight
      );
    });

    return canvas.toDataURL('image/png');
  }

  protected formatDateToDdMmYyyy(value: string | undefined) {
    if (!value) {
      return '-';
    }

    const trimmed = value.trim();

    const alreadyFormatted = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (alreadyFormatted) {
      return `${alreadyFormatted[1]}/${alreadyFormatted[2]}/${alreadyFormatted[3]}`;
    }

    const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
    }

    const parsed = new Date(trimmed);
    if (Number.isNaN(parsed.getTime())) {
      return '-';
    }

    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = parsed.getFullYear();

    return `${day}/${month}/${year}`;
  }
}

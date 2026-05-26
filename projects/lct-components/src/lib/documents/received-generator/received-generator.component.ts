import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { createCode39Barcode } from './code39-barcode.util';

export type LctReceptionPdfPackage = {
  reason?: string;
  lpn?: Array<{ packageLpnValue: string }>;
  isWrongStore?: boolean;
};

export type LctReceptionDisagreePackage = {
  taskId: string;
  lpn: string;
  nodeName: string;
  status: string;
  packageId: string;
  sellerId: number;
  packageStatus: string;
  reason: string;
  selected: boolean;
  packageNew: boolean;
  showIconCopy: boolean;
  receiveConfirmedId: string;
  estimatedArrivalTime: string;
  dataType: string;
  hasPhoto: boolean;
};

export type LctReceptionPdfData = {
  numberPackages?: number;
  detail?: {
    ok?: number;
    cancelled?: number;
    wrongStore?: number;
    noInformation?: number;
    disagreed?: number;
    packageUnknownDisagreed?: number;
    annulled?: number;
  };
  disagreePackageList?: LctReceptionDisagreePackage[];
  country?: string;
  userName?: string;
  userEmail?: string;
  receiveConfirmedId?: string;
  nodeName?: string;
  tractorNumber?: string;
  deck?: string;
  deckNumber?: string;
  date?: string;
  receptionDate?: string;
  receptionEmail?: string;
  packagesTotalCount?: number;
  receiveCount?: number;
  discrepancyCount?: number;
  cancelledCount?: number;
  wrongStoreCount?: number;
  anulledCount?: number;
  annulledCount?: number;
  packages?: LctReceptionPdfPackage[];
};

@Component({
  selector: 'received-pdf, lct-received-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './received-generator.component.html',
  styleUrl: './received-generator.component.scss'
})
export class LctReceivedGeneratorComponent {
  barcodeBars: Array<{ x: number; width: number }> = [];
  barcodeTotalUnits = 0;
  barcodeHeight = 36;
  barcodeDisplayValue = '';

  private static readonly discrepancyReasonsInOrder = [
    'EMPTY_BOX',
    'ADULTERATED',
    'CHANGED',
    'PACKAGING_DAMAGE',
    'MEDIUM_PRODUCT_DAMAGE',
    'NORMAL_PRODUCT_DAMAGE',
    'UNRECOVERABLE_DAMAGE',
    'HIGH_INCOMPLETE_PRODUCT',
    'MEDIUM_INCOMPLETE_PRODUCT',
    'LOW_INCOMPLETE_PRODUCT',
    'INCOMPLETE',
    'WRONG_STORE'
  ] as const;

  private static readonly discrepancyReasons = new Set<string>(
    LctReceivedGeneratorComponent.discrepancyReasonsInOrder
  );

  discrepancyList: LctReceptionPdfPackage[] = [];
  private _receivePdf: LctReceptionPdfData | undefined = undefined;

  @Input()
  set receivePdf(value: LctReceptionPdfData | undefined) {
    this._receivePdf = value;
    this.discrepancyList = this.buildDiscrepancyList(value);
    this.updateBarcode(value?.receiveConfirmedId);
  }

  get receivePdf() {
    return this._receivePdf;
  }

  protected formatReason(reason: string | undefined) {
    switch (reason) {
      case 'EMPTY_BOX':
        return 'Caja Vacía.';
      case 'ADULTERATED':
        return 'Daño de Embalaje Adulterado.';
      case 'CHANGED':
        return 'Cambiado.';
      case 'PACKAGING_DAMAGE':
        return 'Daño Embalaje Normal.';
      case 'MEDIUM_PRODUCT_DAMAGE':
        return 'Daño medio del producto.';
      case 'NORMAL_PRODUCT_DAMAGE':
        return 'Daño de Producto Normal.';
      case 'UNRECOVERABLE_DAMAGE':
        return 'Daño de Producto Irrecuperable.';
      case 'HIGH_INCOMPLETE_PRODUCT':
        return 'Producto Incompleto Alto (100%).';
      case 'MEDIUM_INCOMPLETE_PRODUCT':
        return 'Producto Incompleto Medio (50%).';
      case 'LOW_INCOMPLETE_PRODUCT':
        return 'Producto Incompleto Bajo (20%).';
      case 'INCOMPLETE':
        return 'Producto Incompleto.';
      case 'WRONG_STORE':
        return 'Tienda errónea.';
      case 'earlyArrival':
          return 'Paquete adelantado';
      default:
        return reason || '-';
    }
  }
        

  private buildDiscrepancyList(receivePdf: LctReceptionPdfData | undefined) {
    const packages = this.getNormalizedPackages(receivePdf);

    const filtered = packages.filter(pkg =>
      LctReceivedGeneratorComponent.discrepancyReasons.has(pkg.reason ?? '')
    );

    const reasonOrder = LctReceivedGeneratorComponent.discrepancyReasonsInOrder;

    return filtered
      .slice()
      .sort((a, b) => {
        const reasonIndex =
          reasonOrder.indexOf((a.reason ?? '') as (typeof reasonOrder)[number]) -
          reasonOrder.indexOf((b.reason ?? '') as (typeof reasonOrder)[number]);

        if (reasonIndex !== 0) {
          return reasonIndex;
        }

        const aLpnValue = a.lpn?.[0]?.packageLpnValue ?? '';
        const bLpnValue = b.lpn?.[0]?.packageLpnValue ?? '';
        const aNumber = Number.parseInt(aLpnValue, 10);
        const bNumber = Number.parseInt(bLpnValue, 10);

        if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
          return aLpnValue.localeCompare(bLpnValue);
        }

        return aNumber - bNumber;
      });
  }

  private getNormalizedPackages(receivePdf: LctReceptionPdfData | undefined) {
    const directPackages = receivePdf?.packages;

    if (directPackages && directPackages.length > 0) {
      return directPackages;
    }

    const disagreePackages = receivePdf?.disagreePackageList ?? [];

    return disagreePackages.map(pkg => ({
      reason: pkg.reason,
      lpn: [{ packageLpnValue: pkg.lpn }],
      isWrongStore: pkg.reason === 'WRONG_STORE'
    }));
  }

  getLeftColumn() {
    return this.discrepancyList.slice(0, Math.ceil(this.discrepancyList.length / 2));
  }

  getRightColumn() {
    return this.discrepancyList.slice(Math.ceil(this.discrepancyList.length / 2));
  }

  private updateBarcode(receiveConfirmedId: string | undefined) {
    const barcode = createCode39Barcode(receiveConfirmedId);
    this.barcodeDisplayValue = barcode.displayValue;
    this.barcodeBars = barcode.bars;
    this.barcodeTotalUnits = barcode.totalUnits;
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

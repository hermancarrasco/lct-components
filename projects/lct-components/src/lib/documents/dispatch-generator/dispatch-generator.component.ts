import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type LctCountryCode = 'CL' | 'CO' | 'PE' | string;

export type LctDispatchPdfData = {
  dispatchConfirmedId?: string;
  nodeName?: string;
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
  @Input() dispatchPdf: LctDispatchPdfData | undefined = undefined;
  @Input() country: LctCountryCode = 'CL';

  protected get securityLabel() {
    return this.country === 'CO' ? 'Precinto de seguridad' : 'Sello de seguridad';
  }

  protected get truckPlateLabel() {
    return this.country === 'CO' ? 'Placa camión' : 'Patente camión';
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  LctReceivedGeneratorComponent,
  LctReceptionPdfData,
  LctReceptionPdfPackage
} from './received-generator.component';

describe('LctReceivedGeneratorComponent', () => {
  let component: LctReceivedGeneratorComponent;
  let fixture: ComponentFixture<LctReceivedGeneratorComponent>;

  const mockDiscrepancyPackages: LctReceptionPdfPackage[] = [
    {
      reason: 'ADULTERATED',
      lpn: [{ packageLpnValue: '2' }]
    },
    {
      reason: 'CHANGED',
      lpn: [{ packageLpnValue: '1' }]
    },
    {
      reason: 'PACKAGING_DAMAGE',
      lpn: [{ packageLpnValue: '3' }]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LctReceivedGeneratorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LctReceivedGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.receivePdf).toBeUndefined();
    expect(component.discrepancyList).toEqual([]);
  });

  it('should filter discrepancy packages on input assignment', () => {
    const mockReception: LctReceptionPdfData = {
      receiveConfirmedId: 'CL-001',
      packages: [
        { reason: 'ADULTERATED', lpn: [{ packageLpnValue: '1' }] },
        { reason: 'OK', lpn: [{ packageLpnValue: '2' }] },
        { reason: 'CHANGED', lpn: [{ packageLpnValue: '3' }] }
      ]
    };

    component.receivePdf = mockReception;

    expect(component.discrepancyList.length).toBe(2);
    expect(component.discrepancyList.some(p => p.reason === 'ADULTERATED')).toBeTrue();
  });

  it('should split discrepancy list into left and right columns', () => {
    component.discrepancyList = mockDiscrepancyPackages;

    const leftColumn = component.getLeftColumn();
    const rightColumn = component.getRightColumn();

    expect(leftColumn.length).toBe(2);
    expect(rightColumn.length).toBe(1);
  });

  it('should handle empty packages array', () => {
    component.receivePdf = { receiveConfirmedId: 'CL-002', packages: [] };

    expect(component.discrepancyList.length).toBe(0);
  });

  it('should filter all types of discrepancies', () => {
    const allDiscrepancyTypes = [
      'ADULTERATED',
      'CHANGED',
      'PACKAGING_DAMAGE',
      'MEDIUM_PRODUCT_DAMAGE',
      'UNRECOVERABLE_DAMAGE',
      'INCOMPLETE'
    ];

    const mockPackages = allDiscrepancyTypes.map((reason, index) => ({
      reason,
      lpn: [{ packageLpnValue: index.toString() }]
    }));

    component.receivePdf = {
      receiveConfirmedId: 'CL-003',
      packages: mockPackages as LctReceptionPdfPackage[]
    };

    expect(component.discrepancyList.length).toBe(allDiscrepancyTypes.length);
  });
});

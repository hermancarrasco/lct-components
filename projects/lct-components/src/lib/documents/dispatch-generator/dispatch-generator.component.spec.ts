import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  LctDispatchGeneratorComponent,
  LctDispatchPdfData
} from './dispatch-generator.component';

describe('LctDispatchGeneratorComponent', () => {
  let component: LctDispatchGeneratorComponent;
  let fixture: ComponentFixture<LctDispatchGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LctDispatchGeneratorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LctDispatchGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.dispatchPdf).toBeUndefined();
    expect(component.country).toBe('CL');
  });

  it('should accept dispatchPdf input', () => {
    const dispatchPdf: LctDispatchPdfData = {
      dispatchConfirmedId: 'CL-123',
      nodeName: 'Nodo 1',
      packageCount: 12
    };

    component.dispatchPdf = dispatchPdf;
    expect(component.dispatchPdf).toEqual(dispatchPdf);
  });

  it('should render dispatch information when dispatchPdf is provided', () => {
    component.dispatchPdf = {
      dispatchConfirmedId: 'CL-123',
      nodeName: 'Nodo 1',
      packageCount: 12
    };
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#document_container')).toBeTruthy();
  });
});

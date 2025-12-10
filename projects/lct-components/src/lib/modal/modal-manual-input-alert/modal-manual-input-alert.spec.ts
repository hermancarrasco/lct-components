import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManualInputAlertComponent } from './modal-manual-input-alert';

describe('ModalComponent', () => {
  let component: ModalManualInputAlertComponent;
  let fixture: ComponentFixture<ModalManualInputAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalManualInputAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManualInputAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTooltipComponent } from './modal-tooltip.component';

describe('ModalTooltipComponent', () => {
  let component: ModalTooltipComponent;
  let fixture: ComponentFixture<ModalTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

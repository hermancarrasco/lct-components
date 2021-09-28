import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultiple2Component } from './select-multiple2.component';

describe('SelectMultiple2Component', () => {
  let component: SelectMultiple2Component;
  let fixture: ComponentFixture<SelectMultiple2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMultiple2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultiple2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

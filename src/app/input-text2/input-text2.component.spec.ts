import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputText2Component } from './input-text2.component';

describe('InputText2Component', () => {
  let component: InputText2Component;
  let fixture: ComponentFixture<InputText2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputText2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputText2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

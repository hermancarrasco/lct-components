import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSimpleComponent } from './button-simple.component';

describe('ButtonSimpleComponent', () => {
  let component: ButtonSimpleComponent;
  let fixture: ComponentFixture<ButtonSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

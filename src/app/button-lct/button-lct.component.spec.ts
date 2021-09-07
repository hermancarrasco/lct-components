import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLctComponent } from './button-lct.component';

describe('ButtonLctComponent', () => {
  let component: ButtonLctComponent;
  let fixture: ComponentFixture<ButtonLctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

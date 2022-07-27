import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSimpleComponent } from './input-simple.component';

describe('InputSimpleComponent', () => {
  let component: InputSimpleComponent;
  let fixture: ComponentFixture<InputSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

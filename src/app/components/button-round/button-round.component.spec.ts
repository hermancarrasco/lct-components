import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRoundComponent } from './button-round.component';

describe('ButtonRoundComponent', () => {
  let component: ButtonRoundComponent;
  let fixture: ComponentFixture<ButtonRoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonRoundComponent]
    });
    fixture = TestBed.createComponent(ButtonRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

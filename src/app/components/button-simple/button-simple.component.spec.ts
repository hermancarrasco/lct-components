import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LctComponentsModule } from '../../../../projects/lct-components/src/lib/lct-components.module';

import { ButtonSimpleComponent } from './button-simple.component';

describe('ButtonSimpleComponent', () => {
  let component: ButtonSimpleComponent;
  let fixture: ComponentFixture<ButtonSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LctComponentsModule ],
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

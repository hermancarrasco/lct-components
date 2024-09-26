import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IToastComponent } from './toast.component';

describe('IToastComponent', () => {
  let component: IToastComponent;
  let fixture: ComponentFixture<IToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

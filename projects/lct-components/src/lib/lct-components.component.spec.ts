import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LctComponentsComponent } from './lct-components.component';

describe('LctComponentsComponent', () => {
  let component: LctComponentsComponent;
  let fixture: ComponentFixture<LctComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LctComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LctComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

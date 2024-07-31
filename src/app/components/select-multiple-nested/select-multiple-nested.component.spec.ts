import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleNestedComponent } from './select-multiple-nested.component';

describe('SelectMultipleNestedComponent', () => {
  let component: SelectMultipleNestedComponent;
  let fixture: ComponentFixture<SelectMultipleNestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMultipleNestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultipleNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSimpleComponent } from './select-simple.component';
import { LctComponentsModule } from '../../../../projects/lct-components/src/lib/lct-components.module';

describe('SelectSimpleComponent', () => {
  let component: SelectSimpleComponent;
  let fixture: ComponentFixture<SelectSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LctComponentsModule ],
      declarations: [ SelectSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

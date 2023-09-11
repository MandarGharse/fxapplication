import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridBlotterVrmComponent } from './ag-grid-blotter-vrm.component';

describe('AgGridBlotterVrmComponent', () => {
  let component: AgGridBlotterVrmComponent;
  let fixture: ComponentFixture<AgGridBlotterVrmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgGridBlotterVrmComponent]
    });
    fixture = TestBed.createComponent(AgGridBlotterVrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

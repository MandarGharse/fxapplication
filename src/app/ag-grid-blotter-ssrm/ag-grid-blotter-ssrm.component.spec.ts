import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridBlotterSSRMComponent } from './ag-grid-blotter-ssrm.component';

describe('AgGridBlotterSSRMComponent', () => {
  let component: AgGridBlotterSSRMComponent;
  let fixture: ComponentFixture<AgGridBlotterSSRMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgGridBlotterSSRMComponent],
    });
    fixture = TestBed.createComponent(AgGridBlotterSSRMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

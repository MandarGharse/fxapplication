import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCaptureComponent } from './trade-capture.component';

describe('TradeCaptureComponent', () => {
  let component: TradeCaptureComponent;
  let fixture: ComponentFixture<TradeCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradeCaptureComponent]
    });
    fixture = TestBed.createComponent(TradeCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

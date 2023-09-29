import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppanelComponent } from './toppanel.component';

describe('ToppanelComponent', () => {
  let component: ToppanelComponent;
  let fixture: ComponentFixture<ToppanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToppanelComponent]
    });
    fixture = TestBed.createComponent(ToppanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

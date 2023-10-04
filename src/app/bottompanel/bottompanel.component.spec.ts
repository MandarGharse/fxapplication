import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottompanelComponent } from './bottompanel.component';

describe('BottompanelComponent', () => {
  let component: BottompanelComponent;
  let fixture: ComponentFixture<BottompanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottompanelComponent]
    });
    fixture = TestBed.createComponent(BottompanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

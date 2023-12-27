import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingFormComponent } from './order-tracking-form.component';

describe('OrderTrackingFormComponent', () => {
  let component: OrderTrackingFormComponent;
  let fixture: ComponentFixture<OrderTrackingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTrackingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

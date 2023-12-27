import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingInfoComponent } from './order-tracking-info.component';

describe('OrderTrackingInfoComponent', () => {
  let component: OrderTrackingInfoComponent;
  let fixture: ComponentFixture<OrderTrackingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTrackingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

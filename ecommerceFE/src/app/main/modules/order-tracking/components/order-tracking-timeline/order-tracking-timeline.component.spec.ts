import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingTimelineComponent } from './order-tracking-timeline.component';

describe('OrderTrackingTimelineComponent', () => {
  let component: OrderTrackingTimelineComponent;
  let fixture: ComponentFixture<OrderTrackingTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTrackingTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

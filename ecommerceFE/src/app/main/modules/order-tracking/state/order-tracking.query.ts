import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { OrderTrackingStore, OrderTrackingState } from './order-tracking.store';

@Injectable({ providedIn: 'root' })
export class OrderTrackingQuery extends Query<OrderTrackingState> {
  orderInfo$ = this.select(x => x.orderInfo);
  constructor(protected store: OrderTrackingStore) {
    super(store);
  }

}

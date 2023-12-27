import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Order } from 'src/app/shared/models/order.model';

export interface OrderTrackingState {
   orderInfo: Order
}

export function createInitialState(): OrderTrackingState {
  return {
    orderInfo: {} as Order
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'order-tracking' })
export class OrderTrackingStore extends Store<OrderTrackingState> {

  constructor() {
    super(createInitialState());
  }

}

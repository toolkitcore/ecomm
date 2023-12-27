import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { OrderApiService } from './../../../../shared/api-services/order-api.service';
import { OrderTrackingStore } from './order-tracking.store';

@Injectable({ providedIn: 'root' })
export class OrderTrackingService {

  constructor(private orderTrackingStore: OrderTrackingStore, private orderApiService: OrderApiService) {
  }

  getOrderInfo(phoneNumber: string, orderCode: string) {
    return this.orderApiService.getOrderInfo(phoneNumber, orderCode).pipe(
      tap(res => {
        this.orderTrackingStore.update({orderInfo: res});
      })
    );
  }

  cancelOrder(orderId: string) {
    return this.orderApiService.cancelOrder(orderId);
  }
}

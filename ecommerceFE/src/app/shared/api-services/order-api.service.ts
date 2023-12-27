import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerInfo, Order, PurchaseOrderInfo } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http: HttpClient) { }

  createOrder(customerInfo: CustomerInfo, orderInfo: PurchaseOrderInfo) {
    return this.http.post('api/order', {
      ...customerInfo,
      ...orderInfo
    });
  }

  getOrderInfo(phoneNumber: string, orderCode: string) {
    return this.http.get<Order>('api/order/info', {
      params: {
        phoneNumber,
        orderCode
      }
    });
  }

  cancelOrder(orderId: string) {
    return this.http.put('api/order/cancel', {
      orderId
    });
  }
}

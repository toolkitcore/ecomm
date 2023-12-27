import { OrderApiService } from './../../../../shared/api-services/order-api.service';
import { Injectable } from '@angular/core';
import { CustomerInfo, PurchaseOrderInfo } from 'src/app/shared/models/order.model';
import { SaleCodeApiService } from './../../../../shared/api-services/sale-code-api.service';
import { ProductCategory } from './../../../../shared/models/product.model';
import { CartQuery } from './cart.query';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(
    private cartStore: CartStore,
    private cartQuery: CartQuery,
    private saleCodeApiService: SaleCodeApiService,
    private orderApiService: OrderApiService
  ) {
  }

  updateQuantityCategory(id: string, quantity: number): void {
    this.cartStore.update(id, entity => {
      const newQuantity = quantity;
      const newTotalPrice = entity.price * newQuantity;
      return {
        ...entity,
        quantity: newQuantity,
        totalPrice: newTotalPrice
      };
    });
  }

  addCategoryToCart(category: ProductCategory): void {
    const findItem = this.cartQuery.getEntity(category.id!);
    if (!findItem) {
      this.cartStore.add({ ...category, quantity: 1, totalPrice: category.price });
      return;
    }
    this.cartStore.update(category.id!, entity => {
      const newQuantity = entity.quantity + 1;
      const newTotalPrice = entity.price * newQuantity;
      return {
        ...entity,
        quantity: newQuantity,
        totalPrice: newTotalPrice
      };
    });
  }

  removeProduct(categoryId: string): void {
    this.cartStore.remove(categoryId);
  }

  resetStore(): void {
    this.cartStore.reset();
  }

  getSaleCodeByCode(code: string) {
    return this.saleCodeApiService.getSaleCodeByCode(code);
  }

  createOrder(customerInfo: CustomerInfo, orderInfo: PurchaseOrderInfo) {
    return this.orderApiService.createOrder(customerInfo, orderInfo);
  }

}
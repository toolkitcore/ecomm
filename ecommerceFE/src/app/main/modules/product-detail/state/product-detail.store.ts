import { Product } from './../../../../shared/models/product.model';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ProductDetailState {
   productDetail: Product;
}

export function createInitialState(): ProductDetailState {
  return {
    productDetail: {} as Product
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product-detail' })
export class ProductDetailStore extends Store<ProductDetailState> {

  constructor() {
    super(createInitialState());
  }

}

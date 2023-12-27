import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ProductDetailStore, ProductDetailState } from './product-detail.store';

@Injectable({ providedIn: 'root' })
export class ProductDetailQuery extends Query<ProductDetailState> {
  productDetail$ = this.select(x => x.productDetail);
  constructor(protected store: ProductDetailStore) {
    super(store);
  }

}

import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductApiService } from './../../../../shared/api-services/product-api.service';
import { ProductDetailStore } from './product-detail.store';

@Injectable({ providedIn: 'root' })
export class ProductDetailService {

  constructor(private productDetailStore: ProductDetailStore, private productApiService: ProductApiService) {
  }


  getProductDetail(slug: string) {
    return this.productApiService.getProductBySlug(slug).pipe(
      tap(res => this.productDetailStore.update({productDetail: res}))
    );
  }
}

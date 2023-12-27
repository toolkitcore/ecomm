import { SupplierApiService } from './../../../../shared/api-services/supplier-api.service';
import { ProductTypeApiService } from './../../../../shared/api-services/product-type-api.service';
import { Product, ProductCategory } from './../../../../shared/models/product.model';
import { ProductApiService } from './../../../../shared/api-services/product-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(
    private productStore: ProductStore,
    private http: HttpClient,
    private productApiService: ProductApiService,
    private productTypeApiService: ProductTypeApiService,
    private supplierApiService: SupplierApiService) {
  }


  getProduct(name: string, supplierId: string, productTypeId: string, pageIndex?: number, pageSize?: number) {
    return this.productApiService.getProducts(name || '', supplierId || '', productTypeId || '', pageIndex, pageSize).pipe(
      tap(res => {
        this.productStore.update({ productPaging: res });
      })
    );
  }
  getProductBySlug(slug: string) {
    return this.productApiService.getProductBySlug(slug);
  }

  getProductTypes() {
    return this.productTypeApiService.getProductType('').pipe(
      tap((res) => this.productStore.update({ productTypeList: res }))
    );
  }

  getSuppliers() {
    return this.supplierApiService.getSupplier('').pipe(
      tap(res => {
        this.productStore.update({ supplierList: res.items });
      })
    );
  }


  createProduct(name: string, description: string, status: string, availableStatus: string, originalPrice: number,
    specialFeatures: string[], configuration: [], categories: ProductCategory[], supplierId: string, productTypeId: string) {
    return this.productApiService.createProduct(name, description, status, availableStatus, originalPrice, specialFeatures, configuration, categories, supplierId,productTypeId );
  }

  deleteProduct(id: string) {
    return this.productApiService.deleteProduct(id);
  }


}

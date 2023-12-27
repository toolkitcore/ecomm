import { PagingModel } from '../models/paging.model';
import { Product, ProductCategory } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private readonly http: HttpClient) { }
  getProducts(name: string, supplierId: string, productTypeId: string, pageIndex?: number, pageSize?: number) {
    return this.http.get<PagingModel<Product>>('api/product', {
      params: {
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        name,
        supplierId,
        productTypeId
      }
    });
  }

  getProductBySlug(slug: string) {
    return this.http.get<Product>(`api/product/${slug}`);
  }

  createProduct(name: string, description: string, status: string, availableStatus: string, originalPrice: number,
    specialFeatures: string[], configuration: [], categories: ProductCategory[], supplierId: string, productTypeId: string) {
    return this.http.post('api/product', {
      name,
      description,
      status,
      availableStatus,
      originalPrice,
      specialFeatures,
      configuration,
      categories,
      supplierId,
      productTypeId
    });
  }

  deleteProduct(id: string) {
    return this.http.delete(`api/product/${id}`);
  }
}

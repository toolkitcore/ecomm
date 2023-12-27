import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from '../models/product-type.model';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeApiService {

  constructor(private readonly http: HttpClient) { }

  getProductType(name: string) {
    return this.http.get<ProductType[]>('api/product-type', {
      params: {
        name
      }
    }); 
  }

  deleteProductType(id: string) {
    return this.http.delete(`api/product-type/${id}`);
  }

  createProductType(name: string, code: string) {
    return this.http.post('api/product-type', {
      name,
      code
    });
  }

  updateProductType(id: string, name: string, code: string) {
    return this.http.put('api/product-type', {
      id,
      name,
      code
    });
  }
}

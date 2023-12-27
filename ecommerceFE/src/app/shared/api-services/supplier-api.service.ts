import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging.model';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierApiService {

  constructor(private readonly http: HttpClient) { }

  createSupplier(name: string, code: string, logo: string, productTypes: string[]) {
    return this.http.post('api/supplier', {
      name,
      code,
      productTypes,
      logo
    });
  }

  updateSupplier(id:string, name: string, code: string, logo: string, productTypes: string[]) {
    return this.http.put('api/supplier', {
      id,
      name,
      code,
      productTypes,
      logo
    });
  }

  getSupplierById(id: string) {
    return this.http.get<Supplier>(`api/supplier/${id}`);
  }

  deleteSupplier(id: string) {
    return this.http.delete(`api/supplier/${id}`);
  }

  getSupplier(name: string, pageIndex?: number, pageSize?: number) {
    return this.http.get<PagingModel<Supplier>>('api/supplier', {
      params: {
        name,
        pageIndex: `${pageIndex || ''}`,
        pageSize: `${pageSize || ''}`
      }
    });
  }
}

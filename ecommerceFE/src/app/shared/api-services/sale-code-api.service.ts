import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from '../models/paging.model';
import { SaleCode } from './../models/sale-code.model';

@Injectable({
  providedIn: 'root'
})
export class SaleCodeApiService {

  constructor(private readonly http: HttpClient) { }

  getSaleCodes(pageIndex: number, pageSize: number, code: string) {
    return this.http.get<PagingModel<SaleCode>>('api/sale-code', {
      params: {
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        code
      }
    });
  }

  createSaleCode(code: string, percent: number, maxPrice: number, validUntil: Date) {
    return this.http.post('api/sale-code', {
      code,
      percent,
      maxPrice,
      validUntil,
    });
  }

  updateSaleCode(code: string, percent: number, maxPrice: number, validUntil: Date) {
    return this.http.put(`api/sale-code`, {
      code,
      percent,
      maxPrice,
      validUntil
    });
  }

  deleteSaleCode(code: string) {
    return this.http.delete(`api/sale-code/${code}`);
  }

  getSaleCodeByCode(code: string) {
    return this.http.get<SaleCode>(`api/sale-code/${code}`);
  }


}

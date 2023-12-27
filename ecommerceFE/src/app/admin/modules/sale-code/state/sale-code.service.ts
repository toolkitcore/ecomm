import { SaleCodeApiService } from './../../../../shared/api-services/sale-code-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SaleCodeStore } from './sale-code.store';

@Injectable({ providedIn: 'root' })
export class SaleCodeService {

  constructor(private saleCodeStore: SaleCodeStore, private http: HttpClient, private saleCodeApiService: SaleCodeApiService) {
  }
  getSaleCodes(pageIndex: number, pageSize: number, code: string) {
    return this.saleCodeApiService.getSaleCodes(pageIndex, pageSize, code).pipe(
      tap(res => {
        this.saleCodeStore.update({ saleCodePaging: res });
      })
    );
  }

  createSaleCode(code: string, percent: number, maxPrice: number, validUntil: Date) {
    return this.saleCodeApiService.createSaleCode(code, percent, maxPrice, validUntil);
  }

  updateSaleCode(code: string, percent: number, maxPrice: number, validUntil: Date) {
    return this.saleCodeApiService.updateSaleCode(code, percent, maxPrice, validUntil);
  }

  deleteSaleCode(code: string) {
    return this.saleCodeApiService.deleteSaleCode(code);
  }


}

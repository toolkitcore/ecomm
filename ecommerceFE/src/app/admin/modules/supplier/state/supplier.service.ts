import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ProductType } from 'src/app/shared/models/product-type.model';
import { ProductTypeApiService } from './../../../../shared/api-services/product-type-api.service';
import { SupplierApiService } from './../../../../shared/api-services/supplier-api.service';
import { SupplierStore } from './supplier.store';

export interface ProductTypeCheckBox extends ProductType {
  isSelected: boolean;
}
@Injectable({ providedIn: 'root' })
export class SupplierService {

  constructor(private supplierStore: SupplierStore,
    private supplierApiService: SupplierApiService,
    private productTypeApiService: ProductTypeApiService,
  ) {
  }

  createSupplier(name: string, code: string, logo: string, productTypes: string[]) {
    return this.supplierApiService.createSupplier(name, code, logo, productTypes);
  }

  updateSupplier(id: string, name: string, code: string, logo: string, productTypes: string[]) {
    return this.supplierApiService.updateSupplier(id, name, code, logo, productTypes);
  }

  getSupplierById(id: string) {
    return this.supplierApiService.getSupplierById(id);
  }

  deleteSupplier(id: string) {
    return this.supplierApiService.deleteSupplier(id);
  }

  getSupplier(name: string, pageIndex?: number, pageSize?: number) {
    return this.supplierApiService.getSupplier(name, pageIndex, pageSize).pipe(
      tap((res) => this.supplierStore.update({ supplierPaging: res }))
    );
  }

  getProductType() {
    return this.productTypeApiService.getProductType('').pipe(
      map(res => {
        res = res.map(item => ({...item, isSelected: false}));
        return res as ProductTypeCheckBox[];
      })
    );
  }
}

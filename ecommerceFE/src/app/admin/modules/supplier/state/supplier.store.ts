import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PagingModel } from 'src/app/shared/models/paging.model';
import { Supplier } from 'src/app/shared/models/supplier.model';

export interface SupplierState {
  supplierPaging: PagingModel<Supplier>;
  supplierNameFilter: string;
  pageIndex: number;
  pageSize: number;
}

export function createInitialState(): SupplierState {
  return {
    supplierPaging: {} as PagingModel<Supplier>,
    supplierNameFilter: '',
    pageIndex: 1,
    pageSize: 10
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'supplier', resettable: true })
export class SupplierStore extends Store<SupplierState> {

  constructor() {
    super(createInitialState());
  }

}

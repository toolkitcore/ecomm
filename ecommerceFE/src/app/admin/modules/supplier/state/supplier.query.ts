import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SupplierStore, SupplierState } from './supplier.store';

@Injectable({ providedIn: 'root' })
export class SupplierQuery extends Query<SupplierState> {

  supplierPaging$ = this.select(x => x.supplierPaging);
  constructor(protected store: SupplierStore) {
    super(store);
  }

}

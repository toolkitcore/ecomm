import { PagingModel } from '../../../../shared/models/paging.model';
import { SaleCode } from './../../../../shared/models/sale-code.model';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SaleCodeState {
  saleCodePaging: PagingModel<SaleCode>;
  saleCodeFilter: string;
  pageIndex: number;
  pageSize: number;
}

export function createInitialState(): SaleCodeState {
  return {
    saleCodePaging: {} as PagingModel<SaleCode>,
    saleCodeFilter: '',
    pageIndex: 1,
    pageSize: 10
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sale-code', resettable: true })
export class SaleCodeStore extends Store<SaleCodeState> {

  constructor() {
    super(createInitialState());
  }

}

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SaleCodeStore, SaleCodeState } from './sale-code.store';

@Injectable({ providedIn: 'root' })
export class SaleCodeQuery extends Query<SaleCodeState> {

  constructor(protected store: SaleCodeStore) {
    super(store);
  }

}

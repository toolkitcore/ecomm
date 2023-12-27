import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { CartState, CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartQuery extends QueryEntity<CartState> {
  cart$ = this.selectAll();
  totalQuantity$ = this.selectAll().pipe(map(items => items.reduce((acc, item) => acc + item.quantity, 0)));
  totalPrice$ = this.selectAll().pipe(map(items => items.reduce((acc, item) => acc + item.quantity * item.price, 0)));
  constructor(protected store: CartStore) {
    super(store);
  }

}

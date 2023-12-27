import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PagingModel } from '../../../../shared/models/paging.model';
import { ProductType } from './../../../../shared/models/product-type.model';
import { Product } from './../../../../shared/models/product.model';
import { Supplier } from './../../../../shared/models/supplier.model';

export interface ProductState extends EntityState<Product> {}


export interface ProductState {
  productPaging: PagingModel<Product>;
  productNameFilter: string;
  pageIndex: number;
  productTypeList: ProductType[];
  supplierList: Supplier[];
  supplierIdFilter: string;
  productTypeIdFilter: string;
}

export function createInitialState(): ProductState {
  return {
    productPaging: {} as PagingModel<Product>,
    productNameFilter: '',
    pageIndex: 1,
    productTypeList: [],
    supplierList: [],
    supplierIdFilter: '',
    productTypeIdFilter: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product', resettable: true })
export class ProductStore extends EntityStore<ProductState> {

  constructor() {
    super(createInitialState());
  }

}

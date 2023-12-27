import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, takeUntil, startWith, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { ProductQuery } from '../state/product.query';
import { ProductService } from '../state/product.service';
import { ProductStore } from '../state/product.store';
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  productPaging$ = this.productQuery.productPaging$;
  searchNameForm = new FormControl('');
  productType = new FormControl('');
  supplier = new FormControl('');
  supplierList$ = this.productQuery.supplierList$;
  productTypeList$ = this.productQuery.productTypeList$;
  destroyed$ = new Subject<void>();
  pageSize = 10;
  leftButtonTitle = "Edit";
  rightButtonTitle = "Delete";
  constructor(
    private readonly productService: ProductService,
    private readonly productQuery: ProductQuery,
    private readonly nzMessage: NzMessageService,
    private readonly router: Router,
    private readonly productStore: ProductStore,
    private  readonly modal: NzModalService
  ) { }
  ngOnInit(): void {
    const {productNameFilter, supplierIdFilter, productTypeIdFilter} = this.productStore.getValue();
    let pageIndex = this.productStore.getValue().pageIndex;
    if (productNameFilter) {
      this.searchNameForm.setValue(productNameFilter);
    }
    if (supplierIdFilter) {
      this.supplier.setValue(supplierIdFilter);
    }
    if (productTypeIdFilter) {
      this.productType.setValue(productTypeIdFilter);
    }
    if (!pageIndex) {
      pageIndex = 1;
    }
    this.getProductTypeList();
    this.getSupplierList();
    this.updateProductStore(pageIndex, this.searchNameForm.value);

    this.setupGetData();
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getProductTypeList(): void {
    const { productTypeList } = this.productQuery.getValue();
    if (productTypeList.length === 0) {
      this.productService.getProductTypes().subscribe();
    }
  }

  getSupplierList(): void {
    const { supplierList } = this.productQuery.getValue();
    if (supplierList.length === 0) {
      this.productService.getSuppliers().subscribe();
    }
  }

  setupGetData(): void {
    const searchName$ = this.searchNameForm.valueChanges.pipe(startWith(this.searchNameForm.value), debounceTime(300));
    const supplier$ = this.supplier.valueChanges.pipe(startWith(this.supplier.value));
    const productType$ = this.productType.valueChanges.pipe(startWith(this.productType.value));

    combineLatest([searchName$, supplier$, productType$]).pipe(
      switchMap(([searchName, supplier, productType]) => {
        this.updateProductStore(1, searchName, supplier, productType);
        return this.productService.getProduct(searchName, supplier, productType, 1, this.pageSize);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }
  updateProductStore(pageIndex: number, name?: string, supplier?: string, productType?: string): void {
    this.productStore.update({pageIndex: pageIndex});
    if (name) {
      this.productStore.update({productNameFilter: name});
    }
    if (supplier) {
      this.productStore.update({supplierIdFilter: supplier});
    }
    if (productType) {
      this.productStore.update({productTypeIdFilter: productType});
    }
  }

  onPageIndexChange(pageIndex: number): void {
    this.updateProductStore(pageIndex);
    this.productService.getProduct(this.searchNameForm.value, this.supplier.value, this.productType.value, pageIndex, this.pageSize).subscribe();
  }

  editProduct(item: Product): void {
    this.router.navigate([`/admin/product/${item.id}/edit`]);
  }

  deleteProduct(item: Product): void {
    this.modal.confirm({
      nzTitle: 'Xóa sản phẩm',
      nzContent: 'Bạn có muốn xóa sản phẩm này',
      nzOnOk: () => {
        this.productService.deleteProduct(item.id!).subscribe(
          () => {
            this.nzMessage.success('Xóa sản phẩm thành công');
            this.productService.getProduct(this.searchNameForm.value, this.supplier.value, this.productType.value, 1, this.pageSize).subscribe();
          },
          (err) => {
            this.nzMessage.error(err.error.detail);
          }
        );
      }

    });
  }

  openProductDetail(item: Product): void {
    this.router.navigate([`/product/${item.slug}`]);
  }
}

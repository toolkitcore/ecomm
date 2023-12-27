import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SupplierQuery } from '../state/supplier.query';
import { SupplierService } from '../state/supplier.service';
import { SupplierStore } from '../state/supplier.store';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {

  supplierPaging$ = this.supplierQuery.supplierPaging$;
  searchNameForm = new FormControl('');
  destroyed$ = new Subject<void>();

  pageSize = 10;
  constructor(
    private readonly supplierService: SupplierService,
    private readonly supplierQuery: SupplierQuery,
    private readonly nzMessage: NzMessageService,
    private readonly router: Router,
    private readonly supplierStore: SupplierStore
  ) { }

  ngOnInit(): void {
    const filterName = this.supplierStore.getValue().supplierNameFilter;
    let pageIndex = this.supplierStore.getValue().pageIndex;
    if (filterName) {
      this.searchNameForm.setValue(filterName);
    }
    if (!pageIndex) {
      pageIndex = 1;
    }
    this.getSupplier(pageIndex, this.searchNameForm.value);
    this.setupSearchName();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setupSearchName(): void {
    this.searchNameForm.valueChanges.pipe( 
      debounceTime(300),
      takeUntil(this.destroyed$)
      ).subscribe(
      (val) => {
        this.getSupplier(1, val);
      }
    );
  }

  onPageIndexChange(pageIndex: number): void {
    this.getSupplier(pageIndex, this.searchNameForm.value);
  }

  getSupplier(pageIndex: number, name?: string): void {
    this.supplierStore.update({ supplierNameFilter: name, pageIndex: pageIndex, pageSize: this.pageSize });
    this.supplierService.getSupplier(name || '', pageIndex, this.pageSize).subscribe();
  }

  deleteSupplier(id: string): void {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        this.nzMessage.success('Xoá nhà cung cấp thành công');
        this.searchNameForm.setValue('');
        this.getSupplier(1);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  editSupplier(id: string): void {
    this.router.navigate(['admin/supplier/edit'], {
      queryParams: {
        supplierId: id
      }
    });
  }

}

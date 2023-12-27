import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { ProductTypeApiService } from 'src/app/shared/api-services/product-type-api.service';
import { ProductType } from 'src/app/shared/models/product-type.model';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit, OnDestroy {

  productTypes: ProductType[] = [];
  isAdding = false;
  newProductType: {
    name: string;
    code: string;
  } = {
      code: '',
      name: ''
    };

  editCache: { [key: string]: { edit: boolean; data: ProductType } } = {};
  searchNameForm = new FormControl('');

  destroyed$ = new Subject<void>();
  constructor(
    private readonly productTypeApiService: ProductTypeApiService,
    private readonly nzMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this.setupFilterName();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setupFilterName(): void {
    this.searchNameForm.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap(val => this.getProductType(val))).subscribe(res => {
          this.productTypes = res;
          this.updateEditCache();
        },
        takeUntil(this.destroyed$));
  }

  getProductType(name?: string): Observable<ProductType[]> {
    return this.productTypeApiService.getProductType(name || '');
  }

  updateEditCache(): void {
    this.productTypes.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  createProductType(name: string, code: string): void {
    this.productTypeApiService.createProductType(name, code).subscribe(() => {
      this.nzMessage.success('Tạo loại sản phẩm thành công');
      this.searchNameForm.setValue('');
      this.closeAddRow();
    },
      (err) => this.nzMessage.error(err.error.detail));
  }

  saveNewItem(): void {
    this.createProductType(this.newProductType.name, this.newProductType.code);
  }

  closeAddRow(): void {
    this.newProductType.code = '';
    this.newProductType.name = '';
    this.isAdding = false;
  }

  deleteProductType(id: string): void {
    this.productTypeApiService.deleteProductType(id).subscribe(() => {
      this.nzMessage.success('Xoá loại sản phẩm thành công');
      this.searchNameForm.setValue('');
    },
      (err) => this.nzMessage.error(err.error.detail));
  }

  onEditClick(id: string): void {
    this.editCache[id].edit = true;
  }

  closeEdit(id: string): void {
    const index = this.productTypes.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.productTypes[index] },
      edit: false
    };
  }

  saveEditItem(editItem: { edit: boolean; data: ProductType }): void {
    this.productTypeApiService.updateProductType(editItem.data.id, editItem.data.name, editItem.data.code).subscribe(
      () => {
        editItem.edit = false;
        this.nzMessage.success('Cập nhật loại sản phẩm thành công');
        const index = this.productTypes.findIndex(item => item.id === editItem.data.id);
        Object.assign(this.productTypes[index], editItem.data);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

}

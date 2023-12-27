import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { tap, debounceTime, takeUntil } from 'rxjs/operators';
import { SaleCode } from './../../../../shared/models/sale-code.model';
import { SaleCodeQuery } from './../state/sale-code.query';
import { SaleCodeService } from './../state/sale-code.service';
import { SaleCodeStore } from './../state/sale-code.store';

@Component({
  selector: 'app-sale-code',
  templateUrl: './sale-code.component.html',
  styleUrls: ['./sale-code.component.scss']
})
export class SaleCodeComponent implements OnInit, OnDestroy {
  saleCodePaging$ = this.saleCodeQuery.select(x => x.saleCodePaging).pipe(tap((res) => this.saleCodeList = res?.items));
  filterName = '';
  isCreateSaleCodeModalVisible = false;
  isEditSaleCodeModalVisible = false;
  createSaleCodeForm!: FormGroup;
  pageSize = 10;
  editCache: { [key: string]: { edit: boolean; data: SaleCode } } = {};
  saleCodeList: SaleCode[] = [];
  searchNameForm = new FormControl('');
  destroyed$ = new Subject<void>();
  constructor(private formBuilder: FormBuilder,
    private readonly saleCodeQuery: SaleCodeQuery,
    private readonly saleCodeService: SaleCodeService,
    private readonly nzMessage: NzMessageService,
    private readonly saleCodeStore: SaleCodeStore) { }

  ngOnInit(): void {
    const filterName = this.saleCodeStore.getValue().saleCodeFilter;
    let pageIndex = this.saleCodeStore.getValue().pageIndex;
    this.createSaleCodeForm = this.formBuilder.group({
      code: ['', Validators.required],
      percent: ['', Validators.required],
      maxPrice: ['', Validators.required],
      validUntil: ['', Validators.required],
    });

    if (filterName) {
      this.searchNameForm.setValue(filterName);
    }
    if (!pageIndex) {
      pageIndex = 1;
    }
    this.getSaleCodes(pageIndex, this.searchNameForm.value);
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
        this.getSaleCodes(1, val);
      }
    );
  }
  getSaleCodes(pageIndex: number, code?: string): void {
    this.saleCodeService.getSaleCodes(pageIndex, this.pageSize, code || '').subscribe((res) => {
      this.updateEditCache(res.items);
    });
  }

  updateEditCache(saleCodes: SaleCode[]): void {
    saleCodes.forEach(item => {
      this.editCache[item.code] = {
        edit: false,
        data: { ...item }
      };
    });
  }


  openCreateModal() {
    this.isCreateSaleCodeModalVisible = true;
  }

  closeCreateModal(): void {
    this.isCreateSaleCodeModalVisible = false;
  }
  closeEditModal(): void {
    this.isEditSaleCodeModalVisible = false;
  }

  createSaleCode(): void {
    const value = this.createSaleCodeForm.value;
    if (this.createSaleCodeForm.invalid) {
      this.nzMessage.warning('Vui lòng điền đầy đủ thông tin');
      return;
    }
    this.saleCodeService.createSaleCode(value.code, value.percent, value.maxPrice, value.validUntil)
      .subscribe(() => {
        this.nzMessage.success('Tạo mã giảm giá thành công');
        this.getSaleCodes(1);
        this.closeCreateModal();
      },
        (err) => this.nzMessage.error(err.error.detail)
      );
  }

  editSaleCode(code: string): void {
    this.isEditSaleCodeModalVisible = true;
    this.editCache[code].edit = true;
  }

  closeEdit(code: string): void {
    const index = this.saleCodeList.findIndex(item => item.code === code);
    this.editCache[code] = {
      data: { ...this.saleCodeList[index] },
      edit: false
    };
  }

  saveEditItem(item: { edit: boolean; data: SaleCode }) {
    this.saleCodeService.updateSaleCode(item.data.code, item.data.percent, item.data.maxPrice, item.data.validUntil).subscribe(
      () => {
        item.edit = false;
        this.nzMessage.success('Cập nhật thông tin mã giảm giá thành công');
        this.searchNameForm.setValue('');
        this.getSaleCodes(1);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  onPageIndexChange(pageIndex: number): void {
    this.getSaleCodes(pageIndex, this.searchNameForm.value);
  }
  deleteSaleCode(code: string): void {
    this.saleCodeService.deleteSaleCode(code).subscribe(
      () => {
        this.nzMessage.success('Xoá mã giảm giá thành công');
        this.searchNameForm.setValue('');
        this.getSaleCodes(1);
      },

      (err) => this.nzMessage.error(err.error.detail)
    );
  }
  onFilterNameChange(value: string): void {
  }

}

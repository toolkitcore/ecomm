import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductTypeCheckBox, SupplierService } from '../state/supplier.service';
import { SupplierStore } from '../state/supplier.store';
import { FirebaseService } from './../../../../shared/util-services/firebase.service';


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  fileToUpload: File | null = null;
  previewImgSrc!: string;
  productTypeIdsSelected: string[] = [];
  productTypes: ProductTypeCheckBox[] = [];
  supplierName!: string;
  supplierCode!: string;
  supplierLogo!: string;
  supplierId!: string;
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly activeRoute: ActivatedRoute,
    private readonly nzMessage: NzMessageService,
    private readonly supplierService: SupplierService,
    private readonly supplierStore: SupplierStore,
    private readonly router: Router) { }

  ngOnInit(): void {
    const queryParams = this.activeRoute.snapshot.queryParams;
    if (queryParams) {
      this.supplierId = queryParams.supplierId;
    }
    this.getProductType();
  }

  getProductType(): void {
    this.supplierService.getProductType()
    .subscribe(res => {
      this.productTypes = res;
      if (this.supplierId) {
        this.getSupplierId(this.supplierId);
      }
    });
  }

  onCheckBoxChange(values: string[]): void {
    this.productTypeIdsSelected = values;
  }

  getSupplierId(id: string): void {
    this.supplierService.getSupplierById(id).subscribe(res => {
      this.supplierLogo = res.logo;
      this.supplierCode = res.code;
      this.supplierName = res.name;
      this.productTypes = this.productTypes.map(item => {
        item.isSelected = res.productTypes.some(x => x.id === item.id);
        return item;
      });
    });
  }

  handleFileInput(event: Event) {
    const target = event.target as any;
    const files = target.files;
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.previewImgSrc = reader.result as string;
    reader.readAsDataURL(this.fileToUpload!);
  }

  submit(): void {
    if (!this.supplierCode && !this.supplierName) {
      this.nzMessage.warning('Hãy điền đầy đủ thông tin');
      return;
    }
    if (!this.supplierId && !this.fileToUpload) {
      this.nzMessage.warning('Hãy upload logo');
      return;
    }
    // Create new supplier
    if (!this.supplierId) {
      this.firebaseService.uploadImages(this.fileToUpload!).subscribe(
        url => {
          this.supplierLogo = url;
          this.createSupplier();
        }
      );
    } else {
      //Update Supplier Info
      if (this.fileToUpload) {
        this.firebaseService.uploadImages(this.fileToUpload!).subscribe(
          url => {
            this.supplierLogo = url;
            this.updateSupplier();
          }
        );
      } else {
        this.updateSupplier();
      }
    }

  }

  closeEdit(): void {
    this.router.navigate(['admin/supplier']);
  }

  createSupplier(): void {
    this.supplierService.createSupplier(this.supplierName, this.supplierCode, this.supplierLogo, this.productTypeIdsSelected).subscribe(
      () => {
        this.nzMessage.success('Tạo nhà cung cấp thành công');
        this.supplierStore.reset();
        this.router.navigate(['admin/supplier']);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  updateSupplier(): void {
    this.supplierService.updateSupplier(this.supplierId, this.supplierName, this.supplierCode, this.supplierLogo, this.productTypeIdsSelected).subscribe(
      () => {
        this.nzMessage.success('Cập nhật thông tin nhà cung cấp thành công');
        this.router.navigate(['admin/supplier']);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }
}

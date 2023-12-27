import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin, pipe } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AvailableStatusProduct } from 'src/app/core/const/product-available-status';
import * as XLSX from 'xlsx';
import { ProductQuery } from '../state/product.query';
import { ProductService } from '../state/product.service';
import { Product } from './../../../../shared/models/product.model';
import { FirebaseService } from './../../../../shared/util-services/firebase.service';
import { ProductStore } from './../state/product.store';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  createProductForm!: FormGroup;
  categories!: FormArray;
  availableStatus = [
    { value: AvailableStatusProduct.Waiting, status: "Chờ đặt hàng" },
    { value: AvailableStatusProduct.Available, status: "Có sẵn" },
    { value: AvailableStatusProduct.SoldOut, status: "Hết hàng" }
  ];
  productTypeList$ = this.productQuery.productTypeList$;
  supplierList$ = this.productQuery.supplierList$;
  configuration!: FormArray;
  product?: Product;
  specialOnEnter!: string;
  public configurationEditor = ClassicEditor;
  isSpinning = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private productQuery: ProductQuery,
    private readonly nzMessage: NzMessageService,
    private readonly firebaseService: FirebaseService,
    private productStore: ProductStore
  ) { }

  ngOnInit() {
    this.initForm();
    this.getProductTypeList();
    this.getSupplierList();
  }
  initForm() {
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [''],
      availableStatus: [''],
      originalPrice: [''],
      specialFeatures: [[]],
      supplierId: [''],
      productTypeId: [''],
      configuration: this.formBuilder.array([this.createConfiguration()]),
      categories: this.formBuilder.array([this.createCategories()]),
    });
    this.categories = this.createProductForm.get('categories') as FormArray;
    this.configuration = this.createProductForm.get('configuration') as FormArray;
  }

  createCategories(): FormGroup {
    return this.formBuilder.group({
      image: '', // chính là categoryLogo
      name: '',
      price: '',
      fileToUpload: {} as File,
      previewImgSrc: ''
    });
  }

  createConfiguration(): FormGroup {
    return this.formBuilder.group({
      key: '',
      description: ''
    });
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

  onAddSpecialFeatures(event: any) {
    if (event.target.value) {
      this.createProductForm.value.specialFeatures.push(event.target.value);
    }
    this.specialOnEnter = '';
  }

  onDeleteSpecialFeatures(i: number) {
    this.createProductForm.value.specialFeatures.splice(i, 1);
  }

  addCategories() {
    this.categories = this.createProductForm.get('categories') as FormArray;
    this.categories.push(this.createCategories());
  }
  deleteCategories(i: number) {
    this.categories.removeAt(i);
  }

  onFileChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      && selectedFile.type != "csv" && selectedFile.type != "application/vnd.ms-excel") {
      this.nzMessage.warning('Vui lòng chọn file excel !');
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        // Remove Formarray configuration
        this.configuration.clear();

        // set FormArray
        data.forEach((m: any, i) => {
          if (m.key && m.description) {
            this.configuration = this.createProductForm.get('configuration') as FormArray;
            this.configuration.push(this.createConfiguration());
            this.configuration.controls[i].patchValue({ key: m.key, description: m.description });
          }
        });
      });
    };
  }

  handleFileInput(event: Event, i: number) {

    const target = event.target as any;
    const files = target.files;

    this.categories.controls[i].patchValue({ fileToUpload: files.item(0) });

    const reader = new FileReader();
    reader.onload = e => {
      const imageUrl = reader.result as string;
      this.categories.controls[i].patchValue({ previewImgSrc: imageUrl });
    };
    reader.readAsDataURL(this.createProductForm.value.categories[i].fileToUpload!);
  }

  closeEdit(): void {
    this.router.navigate(['admin/product']);
  }

  submit(): void {
    let formCreate = this.createProductForm.value;
    for (const i in this.createProductForm.controls) {
      if (this.createProductForm.controls.hasOwnProperty(i)) {
        this.createProductForm.controls[i].markAsDirty();
        this.createProductForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.createProductForm.invalid) {
      return;
    }

    const uploadImages$ = formCreate.categories.map((x: any) => this.firebaseService.uploadImages(x.fileToUpload!).pipe(tap(url => x.image = url)));
    forkJoin(uploadImages$).subscribe(
      {
        complete: () => this.createProduct()
      }
    );
  }
  createProduct(): void {
    this.isSpinning = true;
    let formCreate = this.createProductForm.value;
    this.productService.createProduct(formCreate.name, formCreate.description, formCreate.status, formCreate.availableStatus,
      formCreate.originalPrice, formCreate.specialFeatures, formCreate.configuration, formCreate.categories, formCreate.supplierId, formCreate.productTypeId)
      .pipe(
        finalize(() => this.isSpinning = false)
      ).subscribe(
        () => {
          this.nzMessage.success('Tạo sản phẩm thành công');
          this.productStore.reset();
          this.router.navigate(['admin/product']);
        },
        (err) => this.nzMessage.error(err.error.detail)
      );
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}

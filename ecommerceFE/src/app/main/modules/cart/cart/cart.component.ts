import { PaymentMethod } from './../../../../core/const/payment-method';
import { SaleCode } from './../../../../shared/models/sale-code.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartItem } from './../state/cart.store';
import { CartService } from './../state/cart.service';
import { CartQuery } from './../state/cart.query';
import { Province } from '../../../../shared/models/location.model';
import { LOCATIONDATA } from './../../../../core/data/location.data';
import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/shared/models/location.model';
import { OrderDetail } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  provinceList = LOCATIONDATA;
  districtList: District[] = [];
  cart$ = this.cartQuery.cart$;
  salePrice = 0;
  totalPrice$ = this.cartQuery.totalPrice$;
  formInfo!: FormGroup;
  isAcceptTermRule = true;
  paymentGate!: string;
  saleCode!: string;
  constructor(
    private readonly cartQuery: CartQuery,
    private readonly cartService: CartService,
    private readonly modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initFormInfo();
  }

  initFormInfo(): void {
    this.formInfo = new FormGroup(
      {
        customerName: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        provinceCode: new FormControl('', [Validators.required]),
        districtCode: new FormControl('', Validators.required),
        address: new FormControl('', [Validators.required]),
        note: new FormControl('')
      }
    );
  }

  validateForm(): boolean {
    Object.values(this.formInfo.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
    return this.formInfo.valid;
  }

  paymentByCash(): void {
    if (!this.validateForm()) {
      return;
    }
    if (!this.isAcceptTermRule) {
      this.modal.warning({
        nzContent: 'Quý khách vui lòng chấp nhận điều khoản sử dụng để tiếp tục mua hàng',
        nzCentered: true
      });
      return;
    }
    const order = this.cartQuery.getAll();
    const orderDetails = order.map(item => ({
      categoryId: item.id!,
      quantity: item.quantity
    }));
    const orderInfo = {
      orderDetails,
      paymentMethod: PaymentMethod.Cash,
      saleCode: this.saleCode
    };
    const customerInfo = this.formInfo.value;
    this.cartService.createOrder(customerInfo, orderInfo).subscribe(
      () => {
        this.modal.success({
          nzTitle: 'Đặt hàng thành công',
          nzContent: 'Đơn hàng của quý khách đã được tiếp nhận. Vui lòng kiểm tra email để biết thông tin chi tiết',
          nzCentered: true,
          nzOnOk: () => this.cartService.resetStore()
        });
      },
      (err) => {
        this.modal.error({
          nzTitle: 'Đặt hàng thất bại',
          nzContent: err.error.detail,
          nzCentered: true
        });
      }
    );
  }

  paymentByBank(): void {
    if (!this.validateForm()) {
      return;
    }
    if (!this.isAcceptTermRule) {
      this.modal.warning({
        nzContent: 'Quý khách vui lòng chấp nhận điều khoản sử dụng để tiếp tục mua hàng',
        nzCentered: true
      });
      return;
    }
    if (!this.paymentGate) {
      this.modal.warning({
        nzContent: 'Quý khách vui lòng chọn phương thức thanh toán online',
        nzCentered: true
      });
      return;
    }
    const order = this.cartQuery.getAll();
    const orderDetails = order.map(item => ({
      categoryId: item.id!,
      quantity: item.quantity
    }));
    const orderInfo = {
      orderDetails,
      paymentMethod: PaymentMethod.BankTransfer,
      saleCode: this.saleCode
    };
    const customerInfo = this.formInfo.value;
    this.cartService.createOrder(customerInfo, orderInfo).subscribe(
      () => {
        this.modal.success({
          nzTitle: 'Đặt hàng thành công',
          nzContent: 'Đơn hàng của quý khách đã được tiếp nhận. Vui lòng kiểm tra email để biết thông tin chi tiết',
          nzCentered: true,
          nzOnOk: () => this.cartService.resetStore()
        });
      },
      (err) => {
        this.modal.error({
          nzTitle: 'Đặt hàng thất bại',
          nzContent: err.error.detail,
          nzCentered: true
        });
      }
    );
  }


  openProvinceSelect(isOpen: boolean): void {
    if (isOpen) {
      this.formInfo.patchValue({ province: '', district: '' });
    }
  }

  provinceChange(provinceCode: string): void {
    if (!provinceCode) {
      return;
    }
    this.districtList = LOCATIONDATA.find(x => x.code === provinceCode)!.districts;
  }

  removeItem(categoryId: string): void {
    this.cartService.removeProduct(categoryId);
  }

  updateQuantity(categoryId: string, quantity: number): void {
    this.cartService.updateQuantityCategory(categoryId, quantity);
  }

  applySaleCode(saleCode: SaleCode): void {
    const now = new Date();
    if (now.getDate() > new Date(saleCode.validUntil).getDate()) {
      this.modal.error({
        nzTitle: 'Mã giảm giá không hợp lệ',
        nzContent: 'Mã giảm giá quá hạn sử dụng',
        nzCentered: true
      });
      this.saleCode = '';
      return;
    }
    const { totalPrice } = this.cartQuery.getValue();
    if (totalPrice * (saleCode.percent / 100) <= saleCode.maxPrice) {
      this.salePrice = totalPrice * (saleCode.percent / 100);
    } else {
      this.salePrice = saleCode.maxPrice;
    }
  }

  getSaleCode(): void {
    if (!this.saleCode) {
      this.salePrice = 0;
      return;
    }
    this.cartService.getSaleCodeByCode(this.saleCode).subscribe(
      (res) => {
        this.applySaleCode(res);
      },
      (err) => {
        this.modal.error({
          nzTitle: 'Mã giảm giá không hợp lệ',
          nzContent: 'Mã giảm giá không tồn tại',
          nzCentered: true
        });
        this.saleCode = '';
      }
    );
  }
}

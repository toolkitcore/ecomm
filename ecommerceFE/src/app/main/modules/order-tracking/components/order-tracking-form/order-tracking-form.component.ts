import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderTrackingService } from './../../state/order-tracking.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tracking-form',
  templateUrl: './order-tracking-form.component.html',
  styleUrls: ['./order-tracking-form.component.scss']
})
export class OrderTrackingFormComponent implements OnInit {
  orderTrackingForm!: FormGroup;
  constructor(
    private readonly router: Router,
    private readonly orderTrackingService: OrderTrackingService,
    private readonly modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.orderTrackingForm = new FormGroup({
      tel: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      code: new FormControl(null, Validators.required)
    });
  }

  viewOrderTracking(): void {
    for (const i in this.orderTrackingForm.controls) {
      if (this.orderTrackingForm.controls.hasOwnProperty(i)) {
        this.orderTrackingForm.controls[i].markAsDirty();
        this.orderTrackingForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.orderTrackingForm.invalid) {
      return;
    }
    const { code, tel } = this.orderTrackingForm.value;

    this.orderTrackingService.getOrderInfo(tel, code).subscribe(
      () => {
        this.router.navigate(['/order-tracking/info'], {
          queryParams: {
            code,
            tel
          }
        });
      },
      (err) => {
        this.modal.error({
          nzTitle: 'Không tìm thấy đơn hàng',
          nzContent: err.error.detail,
          nzCentered: true
        });
      }
    );

  }
}

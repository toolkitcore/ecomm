import { PaymentMethod } from './../../../../../core/const/payment-method';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderTrackingService } from './../../state/order-tracking.service';
import { OrderTrackingQuery } from './../../state/order-tracking.query';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tracking-info',
  templateUrl: './order-tracking-info.component.html',
  styleUrls: ['./order-tracking-info.component.scss']
})
export class OrderTrackingInfoComponent implements OnInit {
  orderTel!: string;
  orderCode!: string;
  orderInfo$ = this.orderTrackingQuery.orderInfo$;
  paymentMethod = PaymentMethod;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly orderTrackingQuery: OrderTrackingQuery,
    private readonly orderTrackingService: OrderTrackingService,
    private readonly modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.getQueryParamsInfo();
    this.getOrderInfo();
  }

  getOrderInfo(): void {
    const { orderInfo } = this.orderTrackingQuery.getValue();
    if (!orderInfo || (orderInfo.orderCode !== this.orderCode || orderInfo.phoneNumber !== this.orderTel)) {
      this.orderTrackingService.getOrderInfo(this.orderTel, this.orderCode).subscribe(
        {
          error: (err) => {
            this.modal.error({
              nzTitle: 'Không tìm thấy đơn hàng',
              nzContent: err.error.detail,
              nzCentered: true,
              nzOnOk: () => this.router.navigate(['order-tracking'])
            });
          }
        }
      );
    }
  }

  getQueryParamsInfo(): void {
    this.orderTel = this.activatedRoute.snapshot.queryParams.tel;
    this.orderCode = this.activatedRoute.snapshot.queryParams.code;
  }

  goTimelinePage(): void {
    this.router.navigate(['/order-tracking/timeline'], {
      queryParams: {
        code: this.orderCode,
        tel: this.orderTel
      }
    });
  }

  cancelOrder(orderId: string): void {
    this.modal.confirm({
      nzTitle: 'Bạn có muốn hủy đơn hàng này?',
      nzContent: 'Lưu ý: Bạn sẽ không thể hủy đơn hàng đang được vận chuyển',
      nzOnOk: () => this.orderTrackingService.cancelOrder(orderId).subscribe(
        () => {
          this.modal.success({
            nzTitle: 'Hủy đơn hàng thành công',
            nzContent: 'Đơn hàng đã bị hủy.',
            nzCentered: true,
            nzOnOk: () => this.orderTrackingService.getOrderInfo(this.orderTel, this.orderCode).subscribe()
          });
        },
        (err) => {
          this.modal.success({
            nzTitle: 'Hủy đơn hàng thất bại',
            nzContent: err.error.detail,
            nzCentered: true,
          });
        }
      ),
      nzCentered: true,
    });
  }
}

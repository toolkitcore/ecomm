import { OrderStatus } from './../../../../../core/const/order-status';
import { map, filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderTrackingService } from './../../state/order-tracking.service';
import { OrderTrackingQuery } from './../../state/order-tracking.query';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tracking-timeline',
  templateUrl: './order-tracking-timeline.component.html',
  styleUrls: ['./order-tracking-timeline.component.scss']
})
export class OrderTrackingTimelineComponent implements OnInit {
  orderTel!: string;
  orderCode!: string;
  orderInfo$ = this.orderTrackingQuery.orderInfo$.pipe(
    filter(x => !!x.id),
    map(res => {
      res.orderLogs = res.orderLogs.sort((a, b) => {
        const aDate = new Date(a.timeStamp);
        const bDate = new Date(b.timeStamp);
        return bDate.getTime() - aDate.getTime();
      });
      return res;
    }));
  orderStatus = OrderStatus;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
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

  goToOrderDetail(): void {
    this.router.navigate(['/order-tracking/info'], {
      queryParams: {
        code: this.orderCode,
        tel: this.orderTel
      }
    });
  }
}

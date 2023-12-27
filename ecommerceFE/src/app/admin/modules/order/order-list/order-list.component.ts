import { of } from 'rxjs';
import { TableQueryParams } from './../../../../shared/models/table-query-params.model';
import { OrderStatus } from './../../../../core/const/order-status';
import { PaymentStatus } from './../../../../core/const/payment-status';
import { Component, OnInit } from '@angular/core';
import { LOCATIONDATA } from 'src/app/core/data/location.data';
import { HeaderTable } from './../../../../shared/models/table.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  data = [1, 2, 3, 4];
  headers: HeaderTable[] = [
    {
      label: 'Mã đơn hàng',
      dataType: 'text',
      key: 'orderCode',
      canFilter: true,
      canSort: true,
      placeholder: 'Mã đơn hàng'
    },
    {
      label: 'Ngày mua',
      dataType: 'date',
      key: 'creationTime',
      canFilter: true,
      canSort: true,
    },
    {
      label: 'Sản phẩm',
    },
    {
      label: 'Tổng tiền',
    },
    {
      label: 'Quận/Huyện',
      dataType: 'select',
      canFilter: true,
      dataFilters: of(LOCATIONDATA.flatMap(x => x.districts).map(x => ({
        value: x.code,
        label: x.name
      }))),
      placeholder: 'Quận/huyện'
    },
    {
      label: 'Thành phố',
      dataType: 'select',
      canFilter: true,
      dataFilters: of(LOCATIONDATA.map(x => ({
        value: x.code,
        label: x.name
      }))),
      placeholder: 'Thành phố'
    },
    {
      label: 'Trạng thái thanh toán',
      dataType: 'select',
      canFilter: true,
      dataFilters: of([
        {
          value: PaymentStatus.Complete,
          label: 'Đã hoàn thành'
        },
        {
          value: PaymentStatus.Waiting,
          label: 'Chờ thanh toán'
        }
      ]),
      placeholder: 'Trạng thái'
    },
    {
      label: 'Trạng thái đơn hàng',
      dataType: 'select',
      canFilter: true,
      dataFilters: of([
        {
          value: OrderStatus.Complete,
          label: 'Đã hoàn thành'
        },
        {
          value: OrderStatus.Waiting,
          label: 'Đang xử lý'
        },
        {
          value: OrderStatus.Cancel,
          label: 'Đã hủy'
        },
        {
          value: OrderStatus.Confirm,
          label: 'Đã tiếp nhận'
        },
        {
          value: OrderStatus.Transporting,
          label: 'Đang vận chuyển'
        },
      ]),
      placeholder: 'Trạng thái'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }


  onQueryParamsChange(queryParams: TableQueryParams): void {
    const sortValue = queryParams.sort?.find(x => !!x.value);
    if (sortValue) {
      console.log(sortValue);
    }
    console.log(queryParams);
  }
}

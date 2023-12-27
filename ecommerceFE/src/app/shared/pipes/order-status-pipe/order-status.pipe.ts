import { OrderStatus } from './../../../core/const/order-status';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: unknown): string {
    switch (value) {
      case OrderStatus.Waiting:
        return 'Đang xử lý';
      case OrderStatus.Confirm:
        return 'Đã tiếp nhận';
      case OrderStatus.Transporting:
        return 'Đang vận chuyển';
      case OrderStatus.Complete:
        return 'Hoàn thành';
      case OrderStatus.Cancel:
        return 'Đã hủy';
      default:
        return 'Đang xử lý';
    }
  }

}

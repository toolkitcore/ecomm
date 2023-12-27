import { PaymentStatus } from './../../../core/const/payment-status';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: unknown): string {
    switch (value) {
      case PaymentStatus.Waiting:
        return 'Chờ thanh toán';
      case PaymentStatus.Complete:
        return 'Thanh toán thành công';
      default:
        return 'Chờ thanh toán';
    }
  }

}

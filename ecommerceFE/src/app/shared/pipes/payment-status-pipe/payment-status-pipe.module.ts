import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from './payment-status.pipe';



@NgModule({
  declarations: [
    PaymentStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaymentStatusPipe
  ]
})
export class PaymentStatusPipeModule { }

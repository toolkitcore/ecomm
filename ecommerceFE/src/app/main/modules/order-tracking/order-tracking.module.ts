import { PaymentStatusPipeModule } from './../../../shared/pipes/payment-status-pipe/payment-status-pipe.module';
import { OrderStatusPipeModule } from './../../../shared/pipes/order-status-pipe/order-status-pipe.module';
import { DistrictPipeModule } from './../../../shared/pipes/district-pipe/district-pipe.module';
import { ProvincePipeModule } from './../../../shared/pipes/province-pipe/province-pipe.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { OrderTrackingFormComponent } from './components/order-tracking-form/order-tracking-form.component';
import { OrderTrackingInfoComponent } from './components/order-tracking-info/order-tracking-info.component';
import { OrderTrackingTimelineComponent } from './components/order-tracking-timeline/order-tracking-timeline.component';
import { OrderTrackingRoutingModule } from './order-tracking-routing.module';
import { OrderTrackingComponent } from './order-tracking.component';

const nzModules = [
  NzFormModule,
  NzInputModule,
  NzIconModule,
  NzTimelineModule,
  NzDividerModule,
  NzModalModule
];

@NgModule({
  declarations: [
    OrderTrackingComponent,
    OrderTrackingFormComponent,
    OrderTrackingInfoComponent,
    OrderTrackingTimelineComponent
  ],
  imports: [
    CommonModule,
    OrderTrackingRoutingModule,
    nzModules,
    FormsModule,
    ReactiveFormsModule,
    ProvincePipeModule,
    DistrictPipeModule,
    OrderStatusPipeModule,
    PaymentStatusPipeModule
  ]
})
export class OrderTrackingModule { }

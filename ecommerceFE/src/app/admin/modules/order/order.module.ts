import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';

const nzModules = [
  NzTableModule,
  NzDropDownModule,
  NzIconModule,
  NzButtonModule,
  NzDatePickerModule,
  NzSelectModule,
  NzInputModule
];

@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    nzModules
  ]
})
export class OrderModule { }

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SaleCodeRoutingModule } from './sale-code-routing.module';
import { SaleCodeComponent } from './sale-code/sale-code.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


const nzModule = [
  NzTableModule,
  NzIconModule,
  NzButtonModule,
  NzInputModule,
  NzSelectModule,
  NzDropDownModule,
  NzModalModule,
  NzPopconfirmModule,
  NzDatePickerModule,
  NzMessageModule
];

@NgModule({
  declarations: [
    SaleCodeComponent
  ],
  imports: [
    CommonModule,
    SaleCodeRoutingModule,
    FormsModule,
    nzModule,
    ReactiveFormsModule
    ]
})
export class SaleCodeModule { }

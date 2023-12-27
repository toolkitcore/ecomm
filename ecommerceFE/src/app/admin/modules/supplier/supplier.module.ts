import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier/supplier.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


const nzModule = [
  NzInputModule,
  NzIconModule,
  NzPaginationModule,
  NzButtonModule,
  NzAvatarModule,
  NzCheckboxModule,
  NzMessageModule,
  NzPopconfirmModule
];

@NgModule({
  declarations: [
    SupplierComponent,
    SupplierEditComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    nzModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule { }

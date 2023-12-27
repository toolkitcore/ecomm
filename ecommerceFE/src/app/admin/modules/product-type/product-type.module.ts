import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProductTypeRoutingModule } from './product-type-routing.module';
import { ProductTypeComponent } from './product-type/product-type.component';

const nzModule = [
  NzInputModule,
  NzIconModule,
  NzButtonModule,
  NzTableModule,
  NzMessageModule,
  NzPopconfirmModule 
];

@NgModule({
  declarations: [
    ProductTypeComponent
  ],
  imports: [
    CommonModule,
    ProductTypeRoutingModule,
    nzModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductTypeModule { }

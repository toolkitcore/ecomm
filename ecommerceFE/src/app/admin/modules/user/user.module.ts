import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


const nzModule = [
  NzTableModule,
  NzIconModule,
  NzButtonModule,
  NzInputModule,
  NzSelectModule,
  NzDropDownModule,
  NzModalModule,
  NzPopconfirmModule,
  NzMessageModule
];
@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    nzModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }

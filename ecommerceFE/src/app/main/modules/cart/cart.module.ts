import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';


const nzModules = [
  NzInputNumberModule, 
  NzIconModule,
  NzInputModule,
  NzButtonModule,
  NzFormModule,
  NzGridModule,
  NzSelectModule,
  NzDividerModule,
  NzRadioModule,
  NzCheckboxModule,
  NzModalModule
];

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    nzModules,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }

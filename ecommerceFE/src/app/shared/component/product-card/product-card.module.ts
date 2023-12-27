import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ProductCardComponent } from './product-card.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';



const nzModule = [
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  FormsModule,
  NzModalModule,
  NzTypographyModule
];

@NgModule({
  declarations: [
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    nzModule
  ],
  exports: [
    ProductCardComponent
  ]

})
export class ProductCardModule { }

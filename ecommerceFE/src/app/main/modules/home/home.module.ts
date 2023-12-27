import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { BlockProductsModule } from 'src/app/shared/component/block-products/block-products.module';

const nzModule = [
  NzCarouselModule
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    nzModule,
    BlockProductsModule
  ]
})
export class HomeModule { }

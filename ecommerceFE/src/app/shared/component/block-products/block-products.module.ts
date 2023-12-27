import { RouterModule } from '@angular/router';
import { ProductCardModule } from './../product-card/product-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockProductsComponent } from './block-products.component';



@NgModule({
  declarations: [
    BlockProductsComponent
  ],
  imports: [
    CommonModule,
    ProductCardModule,
    RouterModule
  ],
  exports: [
    BlockProductsComponent
  ]
})
export class BlockProductsModule { }

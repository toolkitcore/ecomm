import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CreateRatingFormComponent } from './components/create-rating-form/create-rating-form.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductCommentComponent } from './components/product-comment/product-comment.component';
import { CreateCommentFormComponent } from './components/create-comment-form/create-comment-form.component';


const nzModules = [
  NzRateModule,
  NzCarouselModule,
  NzIconModule,
  NzProgressModule,
  NzAvatarModule,
  NzModalModule
];

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductRatingComponent,
    CreateRatingFormComponent,
    ProductCommentComponent,
    CreateCommentFormComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    nzModules,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductDetailModule { }

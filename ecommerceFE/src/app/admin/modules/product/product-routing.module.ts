import { ProductEditComponent } from './product-edit/product-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductComponent } from './product-list/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'create',
    component: ProductCreateComponent
  },
  {
    path: ':id/edit',
    component: ProductEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

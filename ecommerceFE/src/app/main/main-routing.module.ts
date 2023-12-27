import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'cart',
        loadChildren: () => import('./modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'order-tracking',
        loadChildren: () => import('./modules/order-tracking/order-tracking.module').then((m) => m.OrderTrackingModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product-detail/product-detail.module').then((m) => m.ProductDetailModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

import { RoleGuard } from '../core/guards/role.guard';
import { AppRole } from './../core/const/app-role';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'supplier',
        loadChildren: () => import('./modules/supplier/supplier.module').then((m) => m.SupplierModule),
        data: {
          requireRoles: [AppRole.Admin, AppRole.SuperAdmin]
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
        data: {
          requireRoles: [AppRole.Admin, AppRole.SuperAdmin]
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'product-type',
        loadChildren: () => import('./modules/product-type/product-type.module').then((m) => m.ProductTypeModule),
        data: {
          requireRoles: [AppRole.Admin, AppRole.SuperAdmin]
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
        data: {
          requireRoles: [AppRole.SuperAdmin]
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'sale-code',
        loadChildren: () => import('./modules/sale-code/sale-code.module').then((m) => m.SaleCodeModule),
        data: {
          requireRoles: [AppRole.SuperAdmin, AppRole.Admin]
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'order',
        loadChildren: () => import('./modules/order/order.module').then((m) => m.OrderModule),
        data: {
          requireRoles: [AppRole.Admin]
        },
        canActivate: [RoleGuard]
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'supplier'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

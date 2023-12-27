import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SupplierComponent
  },
  {
    path: 'edit',
    component: SupplierEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }

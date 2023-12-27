import { SaleCodeComponent } from './sale-code/sale-code.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: SaleCodeComponent
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleCodeRoutingModule { }

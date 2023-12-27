import { RoleDirective } from './role.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RoleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoleDirective
  ]
})
export class RoleDirectiveModule { }

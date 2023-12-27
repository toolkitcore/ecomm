import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvincePipe } from './province.pipe';



@NgModule({
  declarations: [
    ProvincePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProvincePipe
  ]
})
export class ProvincePipeModule { }

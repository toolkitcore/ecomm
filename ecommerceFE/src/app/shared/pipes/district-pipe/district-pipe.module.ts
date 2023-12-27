import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictPipe } from './district.pipe';



@NgModule({
  declarations: [
    DistrictPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DistrictPipe
  ]
})
export class DistrictPipeModule { }

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UpdatePasswordService } from './update-password.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UpdatePasswordFormComponent } from './update-password-form.component';

const nzModules = [
  NzModalModule,
  NzFormModule,
  NzInputModule,
  NzIconModule,
  NzMessageModule,
  NzTypographyModule
];

@NgModule({
  declarations: [
    UpdatePasswordFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    nzModules
  ],
  exports: [
    UpdatePasswordFormComponent
  ]
})
export class UpdatePasswordFormModule { }

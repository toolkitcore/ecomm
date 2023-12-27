import { UpdatePasswordFormModule } from './../shared/component/update-password-form/update-password-form.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RoleDirectiveModule } from './../shared/directives/role-directive/role-directive.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';


const nzModule = [
  NzMenuModule,
  NzLayoutModule,
  NzIconModule,
  NzDropDownModule,
  NzAvatarModule,
  NzBadgeModule,
  NzListModule
];

@NgModule({
  declarations: [
    AdminComponent,
    NotificationBellComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    nzModule,
    RoleDirectiveModule,
    UpdatePasswordFormModule
  ]
})
export class AdminModule { }

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { UpdatePasswordFormModule } from './../shared/component/update-password-form/update-password-form.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

const nzModules = [
  NzIconModule,
  NzInputModule,
  NzBadgeModule,
  NzDropDownModule,
  NzModalModule,
  NzButtonModule,
  NzMessageModule,
  NzRadioModule,
  NzAutocompleteModule,
  NzTypographyModule
];

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    UpdatePasswordFormModule,
    CommonModule,
    MainRoutingModule,
    nzModules,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }

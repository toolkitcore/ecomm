import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ProductCardModule } from './../../../shared/component/product-card/product-card.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductComponent } from './product-list/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';

const nzModule = [
  NzInputModule,
  NzIconModule,
  NzPaginationModule,
  NzButtonModule,
  NzAvatarModule,
  NzCheckboxModule,
  NzMessageModule,
  NzPopconfirmModule,
  NzTagModule,
  NzMenuModule,
  NzDividerModule,
  NzTabsModule,
  NzSelectModule,
  NzCardModule,
  NzGridModule,
  NzTypographyModule,
  NzSpinModule,
  NzFormModule,
  NzTableModule
];


@NgModule({
  declarations: [
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    nzModule,
    FormsModule,
    ProductCardModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class ProductModule { }

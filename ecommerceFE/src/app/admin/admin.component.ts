import { NotificationService } from './../core/notification/notification.service';
import { ProductStore } from './modules/product/state/product.store';
import { UpdatePasswordService } from './../shared/component/update-password-form/update-password.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationQuery } from '../core/authentication/authentication.query';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { AppRole } from './../core/const/app-role';
import { SupplierStore } from './modules/supplier/state/supplier.store';

export interface Menu {
  title: string;
  link: string;
  requireRole?: string[];
  icon: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userProfile$ = this.authenticationQuery.userProfile$;
  menuList: Menu[] = [
    {
      title: 'Nhà cung cấp',
      link: 'admin/supplier',
      icon: 'home',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Loại sản phẩm',
      link: 'admin/product-type',
      icon: 'appstore',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Sản phẩm',
      link: 'admin/product',
      icon: 'shopping',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Đơn hàng',
      link: 'admin/order',
      icon: 'shopping-cart',
      requireRole: [AppRole.Admin]
    },
    {
      title: 'Quản trị',
      link: 'admin/user',
      icon: 'user',
      requireRole: [AppRole.SuperAdmin]
    },
    {
      title: 'Mã giảm giá',
      link: 'admin/sale-code',
      icon: 'barcode',
      requireRole: [AppRole.SuperAdmin, AppRole.Admin]
    }
  ];

  menuSelected$ = new BehaviorSubject<Menu>(this.menuList[0]);
  currentMenuSelected = {} as Menu;
  constructor(
    private readonly router: Router,
    private readonly supplierStore: SupplierStore,
    private readonly productStore: ProductStore,
    private readonly authenticationQuery: AuthenticationQuery,
    private readonly authenticationService: AuthenticationService,
    private readonly updatePasswordService: UpdatePasswordService,
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url.substr(1);
    const currentMenuSelected = this.menuList.find(x => x.link === currentUrl);
    if (!currentMenuSelected) {
      this.currentMenuSelected = this.menuList[0];
    } else {
      this.currentMenuSelected = currentMenuSelected;
    }
    this.menuSelected$.next(this.currentMenuSelected);
    this.getNewNotification();
  }

  getNewNotification(): void {
    this.notificationService.getNewNotification().subscribe();
  }

  onSelectMenu(item: Menu): void {
    if (item !== this.currentMenuSelected) {
      this.resetModuleState();
    }
    this.currentMenuSelected = item;
    this.menuSelected$.next(item);
    this.router.navigate([item.link]);
  }

  resetModuleState(): void {
    this.supplierStore.reset();
    this.productStore.reset();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  updatePassword(): void {
    this.updatePasswordService.openUpdatePasswordForm();
  }
}

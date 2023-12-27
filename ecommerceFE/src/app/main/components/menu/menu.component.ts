import { Component, OnInit } from '@angular/core';
import { ProductTypeApiService } from 'src/app/shared/api-services/product-type-api.service';
import { ProductType } from 'src/app/shared/models/product-type.model';
import { ProductType as productType } from '../../../core/const/product-type';

export interface SubMenuItem extends ProductType {
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: SubMenuItem[] = [];
  constructor(private readonly productTypeApiService: ProductTypeApiService) { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.productTypeApiService.getProductType('').subscribe(
      res => {
        this.menu = res.map(item => (
          {
            ...item,
            icon: this.setIconMenu(item.code)
          }
        ));
      }
    );
  }

  setIconMenu(code: string): string {
    switch (code) {
      case productType.Smartwatch:
        return 'clock-circle';
      case productType.Phone:
        return 'mobile';
      case productType.Laptop:
        return 'laptop';
      case productType.Audio:
        return 'customer-service';
      case productType.Tablet:
        return 'book';
      default:
        return '';
    }
  }

}

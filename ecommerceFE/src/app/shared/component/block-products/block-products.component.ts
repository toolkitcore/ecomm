import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-block-products',
  templateUrl: './block-products.component.html',
  styleUrls: ['./block-products.component.scss']
})
export class BlockProductsComponent{
  @Input() productList!: Product[];
  @Input() title!: {label: string, link: string};
  @Input() filters!: {label: string, link: string}[];
  constructor(private readonly router: Router) { }
  goProductDetail(product: Product) {
    this.router.navigate([`product/${product.slug}`]);
  }
}

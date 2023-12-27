import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() leftButtonTitle!: string;
  @Input() rightButtonTitle!: string;
  @Output() onClickRightButton = new EventEmitter(); 
  @Output() onClickLeftButton = new EventEmitter();
  @Output() onClickToCard = new EventEmitter();
  @Input() isShowFooter = false;
  salePercent!: number;
  constructor() { }

  ngOnInit(): void {
    this.getSalePercent();
  }

  getSalePercent(): void {
    this.salePercent = 100 - Math.round((this.product.currentPrice! / this.product.originalPrice) * 100);
  }

  clickLeftButton(product: Product) {
    this.onClickLeftButton.emit(product);
  }

  clickRightButton(product: Product) {
    this.onClickRightButton.emit(product);
  }

  clickToCard(product: Product) {
    this.onClickToCard.emit(product);
  }
}

import { CartService } from './../cart/state/cart.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductCategory } from './../../../shared/models/product.model';
import { switchMap, tap, filter } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { ProductDetailService } from './state/product-detail.service';
import { ProductDetailQuery } from './state/product-detail.query';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @ViewChild(NzCarouselComponent, { static: false }) carousel!: NzCarouselComponent;
  sliderCategories: ProductCategory[] = [];
  productDetail$ = this.productDetailQuery.productDetail$.pipe(
    filter(x => !!x.id),
    tap(x => {
      this.sliderCategories = x.categories!;
      this.categorySelected = x.categories![0];
    }));
  categorySelected!: ProductCategory;
  isDescriptionCollapsed = true;


  destroyed$ = new Subject<void>();
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productDetailQuery: ProductDetailQuery,
    private readonly productDetailService: ProductDetailService,
    private readonly cartService: CartService,
    private readonly router: Router

  ) { }

  ngOnInit(): void {
    this.getProductDetail();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getProductDetail(): void {
    this.activatedRoute.params.pipe(
      switchMap(route => {
        const { productDetail } = this.productDetailQuery.getValue();
        if (productDetail.slug !== route.slug) {
          return this.productDetailService.getProductDetail(route.slug);
        }
        return of(route);
      })
    ).subscribe();
  }

  selectCategory(index: number): void {
    if (!this.sliderCategories[index].isActive) {
      return;
    }
    this.categorySelected = this.sliderCategories[index];
    this.carousel.goTo(index);
  }

  buyCategory(): void {
    this.cartService.addCategoryToCart(this.categorySelected);
    this.router.navigate(['/cart']);
  }
}

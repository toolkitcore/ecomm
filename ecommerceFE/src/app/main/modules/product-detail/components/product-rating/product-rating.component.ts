import { CreateRatingFormComponent } from './../create-rating-form/create-rating-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent implements OnInit {
  @ViewChild('createRating') creatRating!: CreateRatingFormComponent;
  constructor() { }

  ngOnInit(): void {
  }

  postRating(): void {
    this.creatRating.isVisible = true;
  }

}

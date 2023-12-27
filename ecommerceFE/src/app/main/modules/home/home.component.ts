
import { Component, OnInit } from '@angular/core';
import { SupplierApiService } from 'src/app/shared/api-services/supplier-api.service';
import { Supplier } from 'src/app/shared/models/supplier.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliderImages = [
    {src: 'assets/promotion/slider_1.png'},
    {src: 'assets/promotion/slider_2.png'},
    {src: 'assets/promotion/slider_3.png'},
    {src: 'assets/promotion/slider_4.png'},
    {src: 'assets/promotion/slider_5.png'},
  ];

  hotSuppliers: Supplier[] = [];
  constructor(private readonly supplierApiService: SupplierApiService) { }

  ngOnInit(): void {
    this.getHotSupplier();
  }

  getHotSupplier(): void {
    this.supplierApiService.getSupplier('', 1, 4).subscribe(
      res => this.hotSuppliers = res.items
    );
  }
}

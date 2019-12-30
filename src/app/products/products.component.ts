import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = null;

  constructor(public ps: ProductService) {
  }

  ngOnInit() {
    if (!this.ps.products) {
      this.ps.getAllProduct().subscribe((value) => {
        this.ps.products = value;
        this.products = value;
        console.log(value);
      });
    }
  }
}

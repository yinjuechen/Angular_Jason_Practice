import {Component, Inject, Input, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  @Input() product;
  constructor(private ps: ProductService, private  router: Router) { }

  ngOnInit() {
  }

  goToApplication() {
    this.ps.currentProduct = this.product;
    this.router.navigate(['/application']);
  }
}

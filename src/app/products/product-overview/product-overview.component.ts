import {Component, Inject, Input, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Router} from '@angular/router';
import {DateService} from '../../shared/services/date.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  @Input() product;

  constructor(private ps: ProductService,
              private ds: DateService,
              private auth: AuthService,
              private snackBar: MatSnackBar,
              private  router: Router) {
  }

  ngOnInit() {
  }

  goToApplication() {
    if (this.auth.user && this.auth.user.profile.id !== 2) {
      this.snackBar.open('Please Sign in as a customer', 'OK', {
        duration: 1500,
        verticalPosition: 'top'
      });
    } else if (this.ds.pickUpDate && this.ds.returnDate) {
      this.ps.currentProduct = this.product;
      this.router.navigate(['/application']);
    } else {
      this.snackBar.open('Please Select Pick Up Date And Return Date First', 'OK', {
        duration: 1500,
        verticalPosition: 'top'
      });
    }
  }
}

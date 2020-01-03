import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/models/product';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = null;
  productsFromGroup: FormGroup;
  minPickUpDate: Date;
  minReturnDate: Date;

  constructor(public ps: ProductService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.minPickUpDate = new Date();
    this.ps.getAllProduct().subscribe((value) => {
      this.ps.products = value;
      this.products = value;
      console.log(value);
    });
    this.productsFromGroup = this.fb.group({
      pickUpDate: [''],
      returnDate: [''],
    });
  }

  setMinDate() {
    this.minReturnDate = this.productsFromGroup.value.pickUpDate;
    // console.log(this.minReturnDate);
  }

  getAvailableTrucksByDate() {
    const pickUpDate = this.productsFromGroup.value.pickUpDate;
    const returnDate = this.productsFromGroup.value.returnDate;
    const startdate = '' + pickUpDate.getFullYear() + '-' + (pickUpDate.getMonth() + 1) + '-' + pickUpDate.getDate();
    const enddate = `${returnDate.getFullYear()}-${returnDate.getMonth() + 1}-${returnDate.getDate()}`;
    // console.log(startdate, enddate);
    this.ps.getAlltrucksTimeSlot().subscribe((value) => {
      console.log(value);
      let available = false;
      if (new Date(value[0].startdate) > returnDate) {
        available = true;
      }
      if ((!available) && value[value.length - 1].enddate < pickUpDate) {
        available = true;
      }
      if (!available) {
        for (let i = 0; i < value.length - 1; i++) {
          const date1 = new Date(value[i].enddate);
          const date2 = new Date(value[i + 1].startdate);
          if (date1 < pickUpDate && returnDate < date2) {
            console.log('available');
          }
        }
      }
      console.log(available);
    });
  }
}

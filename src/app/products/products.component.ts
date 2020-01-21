import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/models/product';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DateService} from '../shared/services/date.service';
import {AuthService} from '../shared/services/auth.service';
import {matDialogAnimations} from '@angular/material';

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
  minPrice: number;
  maxPrice: number;
  minMPG: number;
  maxMPG: number;
  currentFilterType = '';
  currentPrice;
  selectedValue: any;


  constructor(public ps: ProductService,
              private fb: FormBuilder,
              private ds: DateService) {
  }

  ngOnInit() {
    this.minPickUpDate = new Date();
    this.ps.getAllProduct().subscribe((value) => {
      this.ps.products = value;
      this.products = value;
      this.minPrice = this.products.sort((p1, p2) => {
        return p1.price - p2.price;
      })[0].price;
      this.maxPrice = this.products.sort((p1, p2) => p2.price - p1.price)[0].price;
      this.currentPrice = this.maxPrice;
      this.minMPG = this.products.sort((p1, p2) => p1.mpg - p2.mpg)[0].mpg;
      this.maxMPG = this.products.sort((p1, p2) => p2.mpg - p1.mpg)[0].mpg;
      if (this.ps.onlyPickUpTruck) {
        this.filterProducts({value: '5'});
        this.ps.onlyPickUpTruck = false;
      }
      if (this.ps.onlyVanTruck) {
        this.filterProducts({value: '6'});
        this.ps.onlyVanTruck = false;
      }
    });
    this.productsFromGroup = this.fb.group({
      pickUpDate: [''],
      returnDate: [''],
    });
    if (this.ds.pickUpDate && this.ds.returnDate) {
      this.productsFromGroup.controls.pickUpDate.setValue(this.ds.pickUpDate);
      this.productsFromGroup.controls.returnDate.setValue(this.ds.returnDate);
      this.getAvailableTruckModelsByDate();
      if (this.ps.onlyPickUpTruck) {
        this.filterProducts({value: '5'});
        this.ps.onlyPickUpTruck = false;
      }
      if (this.ps.onlyVanTruck) {
        this.filterProducts({value: '6'});
        this.ps.onlyVanTruck = false;
      }
    }
  }

  setMinDate() {
    this.minReturnDate = this.productsFromGroup.value.pickUpDate;
    // console.log(this.minReturnDate);
    this.ds.pickUpDate = this.productsFromGroup.value.pickUpDate;
  }

  getAvailableTruckModelsByDate() {
    const pickUpDate = this.productsFromGroup.value.pickUpDate;
    const returnDate = this.productsFromGroup.value.returnDate;
    this.ds.pickUpDate = pickUpDate;
    this.ds.returnDate = returnDate;
    if (pickUpDate && returnDate) {
      const startdate = '' + pickUpDate.getFullYear() + '-' + (pickUpDate.getMonth() + 1) + '-' + pickUpDate.getDate();
      const enddate = `${returnDate.getFullYear()}-${returnDate.getMonth() + 1}-${returnDate.getDate()}`;
      // console.log(startdate, enddate);
      // this.ps.getAlltrucksTimeSlot().subscribe((value) => {
      //   console.log(value);
      //   let available = false;
      //   const length = value.length;
      //   const availableTrucks = [];
      //   returnDate < new Date(value[0].startdate) ? available = true : availableTrucks.push(value[0].truckDetail);
      //   pickUpDate > new Date(value[length - 1].enddate) ? available = true : availableTrucks.push(value[length - 1].truckDetail);
      //   if (!available) {
      //     for (let i = 0; i < value.length - 1; i++) {
      //       const date1 = new Date(value[i].enddate);
      //       const date2 = new Date(value[i + 1].startdate);
      //       if (date1 < pickUpDate && returnDate < date2) {
      //         available = true;
      //         availableTrucks.push(value[i].truckDetail);
      //       }
      //     }
      //   }
      //   console.log(availableTrucks);
      // });
      // this.ps.getAllTruckDetail().subscribe( value => {
      //   console.log(value);
      // });
      // this.ps.getReservedTimeSlot(startdate, enddate).subscribe((value) => {
      //   console.log(value);
      // });
      this.ps.getAvailableTruckModelsByDate(startdate, enddate).subscribe(value => {
        console.log(value);
        this.products = value;
        this.ps.products = value;
      });
    } else {
      this.ps.getAllProduct().subscribe((value) => {
        this.ps.products = value;
        this.products = value;
        this.minPrice = this.products.sort((p1, p2) => {
          return p1.price - p2.price;
        })[0].price;
        this.maxPrice = this.products.sort((p1, p2) => p2.price - p1.price)[0].price;
        this.currentPrice = this.maxPrice;
        this.minMPG = this.products.sort((p1, p2) => p1.mpg - p2.mpg)[0].mpg;
        this.maxMPG = this.products.sort((p1, p2) => p2.mpg - p1.mpg)[0].mpg;
      });
    }

  }

  setReturnDate() {
    this.ds.returnDate = this.productsFromGroup.value.returnDate;
  }

  filterProducts($event) {
    console.log($event);
    this.products = this.ps.products;
    switch ($event.value) {
      case '1':
        this.products.sort((p1, p2) => p1.price - p2.price);
        this.currentFilterType = '1';
        break;
      case '2':
        this.products.sort((p1, p2) => p2.price - p1.price);
        this.currentFilterType = '2';
        break;
      case '3':
        this.products.sort((p1, p2) => p1.mpg - p2.mpg);
        this.currentFilterType = '3';
        break;
      case '4':
        this.products.sort((p1, p2) => p2.mpg - p1.mpg);
        this.currentFilterType = '4';
        break;
      case '5':
        this.products = this.products.filter((p) => {
          return p.category.id === 1;
        });
        this.currentFilterType = '5';
        break;
      case '6':
        this.products = this.products.filter(p => {
          // console.log(p);
          return p.category.id === 2;
        });
        this.currentFilterType = '6';
        break;
      case '7':
        this.products = this.ps.products;
        return this.currentFilterType = '7';
    }
  }

  sliderPriceChange($event) {
    this.currentPrice = $event.value;
    this.filterProducts({value: this.currentFilterType});
    this.products = this.products.filter(p => p.price <= $event.value);
  }

  sliderMPGChange($event) {
    this.sliderPriceChange({value: this.currentPrice});
    this.products = this.products.filter(p => p.mpg <= $event.value);
  }

}

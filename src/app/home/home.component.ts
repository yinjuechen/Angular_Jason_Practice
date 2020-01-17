import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/product';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/services/product.service';
import {DateService} from '../shared/services/date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = null;
  productsFromGroup: FormGroup;
  minPickUpDate: Date;
  minReturnDate: Date;
  images = [
    'https://firebasestorage.googleapis.com/v0/b/truck-rental-265020.appspot.com/o/2.png?alt=media&token=5d27ce18-bb69-4bff-9318-d3e83d1cf737',
    'https://static.carsdn.co/cldstatic/wp-content/uploads/ford-f-150-limited-2019-01-angle--exterior--front--silver.jpg',
    'https://imagescdn.dealercarsearch.com/dealerimages/1235/25358/fxslide1.jpg',
    'https://thirdauto.com/wp-content/uploads/2018/05/2018-Ford-Transit-exterior.png'
  ];
  latitude = 40.3625998;
  longitude = -74.5974522;
  zoomLevel = 12;
  mapTypeControlOptions = [
    {
      'featureType': 'administrative',
      'elementType': 'all',
      'stylers': [
        {
          'saturation': '-100'
        }
      ]
    },
    {
      'featureType': 'administrative.province',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'landscape',
      'elementType': 'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'lightness': 65
        },
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'lightness': '50'
        },
        {
          'visibility': 'simplified'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'all',
      'stylers': [
        {
          'saturation': '-100'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'all',
      'stylers': [
        {
          'visibility': 'simplified'
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'all',
      'stylers': [
        {
          'lightness': '30'
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'all',
      'stylers': [
        {
          'lightness': '40'
        }
      ]
    },
    {
      'featureType': 'transit',
      'elementType': 'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'visibility': 'simplified'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'hue': '#ffff00'
        },
        {
          'lightness': -25
        },
        {
          'saturation': -97
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'labels',
      'stylers': [
        {
          'lightness': -25
        },
        {
          'saturation': -100
        }
      ]
    }
  ];

  constructor(public ps: ProductService,
              private fb: FormBuilder,
              private ds: DateService) {
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
    this.ds.pickUpDate = this.productsFromGroup.value.pickUpDate;
  }

  getAvailableTruckModelsByDate() {
    const pickUpDate = this.productsFromGroup.value.pickUpDate;
    const returnDate = this.productsFromGroup.value.returnDate;
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
    });
  }

  setReturnDate() {
    this.ds.returnDate = this.productsFromGroup.value.returnDate;
  }

  filterProducts($event) {
    switch ($event.value) {
      case '1':
        this.products.sort((p1, p2) => p1.price - p2.price);
        break;
      case '2':
        this.products.sort((p1, p2) => p2.price - p1.price);
        break;
      case '3':
        this.products.sort((p1, p2) => p1.mpg - p2.mpg);
        break;
      case '4':
        this.products.sort((p1, p2) => p2.mpg - p1.mpg);
        break;
      case '5':
        this.products.sort((p1, p2) => p1.brand.localeCompare(p2.brand));
    }
  }
}

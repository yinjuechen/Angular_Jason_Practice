import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/product';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/services/product.service';
import {DateService} from '../shared/services/date.service';
import {Router} from '@angular/router';

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
              private router: Router,
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
    this.ds.pickUpDate = pickUpDate;
    this.ds.returnDate = returnDate;
    // const startdate = '' + pickUpDate.getFullYear() + '-' + (pickUpDate.getMonth() + 1) + '-' + pickUpDate.getDate();
    // const enddate = `${returnDate.getFullYear()}-${returnDate.getMonth() + 1}-${returnDate.getDate()}`;
    // this.ps.getAvailableTruckModelsByDate(startdate, enddate).subscribe(value => {
    //   console.log(value);
    //   this.ps.products = value;
    // });
    this.router.navigate(['/trucks']);
  }

  setReturnDate() {
    this.ds.returnDate = this.productsFromGroup.value.returnDate;
  }

  toPickUpOnly() {
    this.ps.onlyPickUpTruck = true;
    this.router.navigate(['/trucks']);
  }

  toVanOnly() {
    this.ps.onlyVanTruck = true;
    this.router.navigate(['/trucks']);
  }
}

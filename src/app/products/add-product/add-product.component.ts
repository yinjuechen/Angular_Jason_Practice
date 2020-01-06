import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {CategoryService} from '../../shared/services/category.service';
import {YearsService} from '../../shared/services/years.service';
import {Router} from '@angular/router';
import {TruckInfoComponent} from '../truck-info/truck-info.component';
import {UsStatesService} from '../../shared/services/us-states.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductFormGroup: FormGroup;
  categories;
  years;
  arr = null;

  // @TODO: AddTrucksForm Validation
  get truckinfos() {
    return this.addProductFormGroup.get('truckinfos') as FormArray;
  }

  addtruckinfo() {
    this.truckinfos.push(this.createTruckInfoGroup());
  }

  createTruckInfoGroup(): FormGroup {
    return this.fb.group({
      plate: ['', [Validators.required]],
      state: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      autoinsurance:['', [Validators.required]],
      mileage: ['', [Validators.required]]
    });
  }

  constructor(private ps: ProductService,
              private fb: FormBuilder,
              private router: Router,
              private cs: CategoryService,
              private ys: YearsService) {
  }

  ngOnInit() {
    // get category
    if (!this.cs.categories) {
      this.cs.getAllCategory().subscribe((value) => {
        this.categories = value;
        this.cs.categories = value;
      });
    } else {
      this.categories = this.cs.categories;
    }

    // Initialize addProduct form
    this.addProductFormGroup = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      image: [''],
      price: ['', [Validators.required]],
      minseat: ['', [Validators.required]],
      maxseat: ['', [Validators.required]],
      mpg: ['', [Validators.required]],
      truckinfos: this.fb.array([])
    });

    // Initialize years
    this.years = this.ys.years;

    // Initialize categories
    if (!this.cs.categories) {
      this.cs.getAllCategory().subscribe((value) => {
        this.categories = value;
        this.cs.categories = value;
      });
    } else {
      this.categories = this.cs.categories;
    }
  }

  addProduct() {
    const truck = {
      brand: this.addProductFormGroup.value.brand,
      model: this.addProductFormGroup.value.model,
      year: this.addProductFormGroup.value.year,
      category: this.categories[this.addProductFormGroup.value.category - 1],
      stock: this.addProductFormGroup.value.stock,
      image: this.addProductFormGroup.value.image,
      price: this.addProductFormGroup.value.price,
      minseat: this.addProductFormGroup.value.minseat,
      maxseat: this.addProductFormGroup.value.maxseat,
      mpg: this.addProductFormGroup.value.mpg
    };
    console.log(this.addProductFormGroup.get('truckinfos'));
    this.ps.AddProduct(truck).subscribe((value) => {
      if (value) {
        const truckModelId = value.id;
        console.log(value.id);
        for (const truckInfoGroup of this.truckinfos.controls) {
          console.log(truckInfoGroup);
          const plate = truckInfoGroup.value.plate;
          const state = truckInfoGroup.value.state;
          const vin = truckInfoGroup.value.vin;
          const autoinsurance = truckInfoGroup.value.autoinsurance;
          const mileage = truckInfoGroup.value.mileage;
          const truckModel = {id: truckModelId};
          const truckDetail = {
            plate,
            state,
            vin,
            mileage,
            autoinsurance,
            truckModel
          };
          console.log(truckDetail);
          this.ps.AddTruckDetail(truckDetail).subscribe();
        }
        this.router.navigate(['/trucks']);
      }
    });
  }

  setTruckInfoArry(event) {
    this.truckinfos.clear();
    this.arr = new Array(+event.target.value);
    for (let i = 0; i < event.target.value; i++) {
      this.addtruckinfo();
    }
  }
}

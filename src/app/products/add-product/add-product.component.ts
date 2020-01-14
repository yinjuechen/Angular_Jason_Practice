import {Component, Input, NgZone, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {CategoryService} from '../../shared/services/category.service';
import {YearsService} from '../../shared/services/years.service';
import {Router} from '@angular/router';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;


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
      vin: ['', [Validators.required,
        Validators.minLength(17),
        Validators.maxLength(17),
        this.validateVin
      ]],
      autoinsurance: ['', [Validators.required]],
      mileage: ['', [Validators.required]]
    });
  }

  validateVin(vinFormContrl: FormControl): null | {} {
    const vin = vinFormContrl.value;
    const invalidInfo = {invalidVIN: 'VIN is not valid'};
    if (vin === '11111111111111111') {
      return invalidInfo;
    }
    if (!vin.match('^([0-9a-hj-npr-zA-HJ-NPR-Z]{10,17})+$')) {
      return invalidInfo;
    }
    const letters = [{k: 'A', v: 1}, {k: 'B', v: 2}, {k: 'C', v: 3},
      {k: 'D', v: 4}, {k: 'E', v: 5}, {k: 'F', v: 6}, {k: 'G', v: 7},
      {k: 'H', v: 8}, {k: 'J', v: 1}, {k: 'K', v: 2}, {k: 'L', v: 3},
      {k: 'M', v: 4}, {k: 'N', v: 5}, {k: 'P', v: 7}, {k: 'R', v: 9},
      {k: 'S', v: 2}, {k: 'T', v: 3}, {k: 'U', v: 4}, {k: 'V', v: 5},
      {k: 'W', v: 6}, {k: 'X', v: 7}, {k: 'Y', v: 8}, {k: 'Z', v: 9}];
    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    const exclude = ['I', 'O', 'Q'];
    let val = 0;
    for (let idx = 0; idx < vin.length; idx++) {
      const item = vin.charAt(idx).toUpperCase();
      if (exclude.includes(item)) {
        return invalidInfo;
      }
      const pos = (item.match('^[0-9]+$') != null) ? parseInt(item) : letters.filter((letter) => {
        return letter.k === item;
      })[0].v;
      val += (pos * weights[idx]);
    }
    const checksum = (val % 11);
    return (vin.charAt(8) === (checksum < 10 ? checksum.toString() : 'X')) ? null : invalidInfo;
  }

  constructor(private ps: ProductService,
              private fb: FormBuilder,
              private router: Router,
              private cloudinary: Cloudinary,
              private cs: CategoryService,
              private afStorage: AngularFireStorage,
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
      mileprice: ['', [Validators.required]],
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
        mpg: this.addProductFormGroup.value.mpg,
        mileprice: this.addProductFormGroup.value.mileprice
      }
    ;
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

  upload($event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put($event.target.files[0]);
    console.log(this.task);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(finalize(() => {
      this.ref.getDownloadURL().subscribe(value => {
        this.addProductFormGroup.controls.image.setValue(value);
      });
      this.downloadURL = this.ref.getDownloadURL();
    })).subscribe();
  }

}

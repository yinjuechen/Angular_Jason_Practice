import {Component, Inject, OnInit} from '@angular/core';
import {YearsService} from '../../../shared/services/years.service';
import {CategoryService} from '../../../shared/services/category.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ReadVarExpr} from '@angular/compiler';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductService} from '../../../shared/services/product.service';

@Component({
  selector: 'app-truckmodel-admin',
  templateUrl: './truckmodel-admin.component.html',
  styleUrls: ['./truckmodel-admin.component.scss']
})
export class TruckmodelAdminComponent implements OnInit {

  truckModelForm;

  constructor(public yearsService: YearsService,
              private ps: ProductService,
              public categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<TruckmodelAdminComponent>,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe(value => {
      this.categoryService.categories = value;
    });
    this.truckModelForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      mileprice: ['', [Validators.required]],
      minseat: ['', [Validators.required]],
      maxseat: ['', [Validators.required]],
      mpg: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      year: ['', [Validators.required]]
    });
    for (const key in this.data) {
      if (this.truckModelForm.controls.hasOwnProperty(key)) {
        this.truckModelForm.controls[key].setValue(this.data[key]);
      }
    }
    this.truckModelForm.controls.category.setValue(this.data.category.id);
  }

  back() {
    this.dialogRef.close();
  }

  submit() {
    this.data = {...this.data, ...this.truckModelForm.value};
    this.data.category = this.categoryService.categories[this.truckModelForm.value.category - 1];
    console.log(this.data);
    this.ps.updateTruckModel(this.data).subscribe(value => {
      this.dialogRef.close();
    });
  }
}

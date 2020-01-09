import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {UsStatesService} from '../../../shared/services/us-states.service';
import {YearsService} from '../../../shared/services/years.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TruckInfo} from '../../../shared/models/truck-info';

@Component({
  selector: 'app-truckdetail-admin',
  templateUrl: './truckdetail-admin.component.html',
  styleUrls: ['./truckdetail-admin.component.scss']
})
export class TruckdetailAdminComponent implements OnInit {
  // truckDetail;
  truckDetailForm: FormGroup;
  truckModelForm: FormGroup;

  constructor(private  ps: ProductService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<TruckdetailAdminComponent>,
              private location: Location,
              public usStatesService: UsStatesService,
  ) {
  }

  ngOnInit() {
    this.truckDetailForm = this.fb.group({
      id: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      state: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      mileage: ['', [Validators.required]],
      autoinsurance: ['', [Validators.required]],
    });
    this.truckModelForm = this.fb.group({
      brand: [{value: '', disabled: true}],
      model: [{value: '', disabled: true}],
      year: [{value: '', disabled: true}]
    });
    console.log(this.data);
    for (const key in this.data) {
      if (this.truckDetailForm.controls.hasOwnProperty(key)) {
        this.truckDetailForm.controls[key].setValue(this.data[key]);
      }
    }
    for (const key in this.data.truckModel) {
      if (this.truckModelForm.controls.hasOwnProperty(key)) {
        this.truckModelForm.controls[key].setValue(this.data.truckModel[key]);
      }
    }
  }

  back() {
    this.dialogRef.close();
  }

  submit() {
    this.data = {...this.data, ...this.truckDetailForm.value};
    console.log(this.data);
    this.ps.updateTruckDetail(this.data).subscribe(value => {
      this.dialogRef.close();
    });
  }
}

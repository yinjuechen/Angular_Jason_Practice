import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../shared/services/application.service';
import {TimeslotService} from '../shared/services/timeslot.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsStatesService} from '../shared/services/us-states.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jsPDF';
import {InsuranceService} from '../shared/services/insurance.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  application;
  timeSlot;
  id;
  orderSummaryInfoForm: FormGroup;
  truckInfoForm: FormGroup;
  truckTotalPrice = 0;
  mileageTotalPrice = 0;
  insuranceTotalPrice = 0;
  days: number;

  constructor(public aps: ApplicationService,
              private ts: TimeslotService,
              private fb: FormBuilder,
              public usStatesService: UsStatesService,
              public is: InsuranceService,
              private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.orderSummaryInfoForm = this.fb.group({
      firstname: [, [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      driver_license: ['', [Validators.required]],
      driver_license_state: ['', [Validators.required]],
      // TODO: validate date input
      driver_license_expired_date: ['', [Validators.required]],
      model: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      plateState: ['', [Validators.required]],
      pickupdate: ['', [Validators.required]],
      returndate: ['', [Validators.required]],
      odometerin: ['', [Validators.required]],
      odometerout: [''],
      ldw: [''],
      sli: ['']
    });
    this.id = this.ar.snapshot.params.id;
    this.is.getAllInsurances().subscribe(value => {
      this.is.insurances = value;
    });
    this.aps.getApplicationById(this.id).subscribe(value => {
      this.application = value;
      console.log(this.application);
      const d1 = new Date(this.application.pickupdate);
      const d2 = new Date(this.application.returndate);
      // @ts-ignore
      this.days = (d2 - d1) / (1000 * 60 * 60 * 24) + 1;
      this.ts.getTimeSlotById(value.reservedid).subscribe(value1 => {
        console.log(value1);
        this.timeSlot = value1;
        for (const key in this.application) {
          if (this.orderSummaryInfoForm.controls.hasOwnProperty(key)) {
            this.orderSummaryInfoForm.controls[key].setValue(this.application[key]);
          }
          this.orderSummaryInfoForm.controls.driver_license_expired_date.setValue(new Date(this.application.driver_license_expired_date));
          this.orderSummaryInfoForm.controls.ldw.setValue(this.application.insurance1 ? true : false);
          this.orderSummaryInfoForm.controls.sli.setValue(this.application.insurance2 ? true : false);
        }
        this.orderSummaryInfoForm.controls.model.setValue(`${this.timeSlot.truckDetail.truckModel.brand}/${this.timeSlot.truckDetail.truckModel.model}/${this.timeSlot.truckDetail.truckModel.year}`);
        this.orderSummaryInfoForm.controls.vin.setValue(this.timeSlot.truckDetail.vin);
        this.orderSummaryInfoForm.controls.plate.setValue(this.timeSlot.truckDetail.plate);
        this.orderSummaryInfoForm.controls.plateState.setValue(this.timeSlot.truckDetail.state);
        this.orderSummaryInfoForm.controls.pickupdate.setValue(new Date(this.timeSlot.startdate));
        this.orderSummaryInfoForm.controls.returndate.setValue(new Date(this.timeSlot.enddate));
        this.orderSummaryInfoForm.controls.odometerin.setValue(this.timeSlot.truckDetail.mileage);
      });
    });
  }

  generatePDF() {
    const doc = new jsPDF();
    html2canvas(document.getElementById('orderSummary')).then((canvas) => {
      const formImg = canvas.toDataURL('image/png');
      doc.addImage(formImg, 'JPEG', 5, 20, 200, 240);
      doc.save('test.pdf');
    });
  }

  selectSLI() {
    if (this.orderSummaryInfoForm.value.sli) {
      this.application.insuranceprice += this.is.insurances[1].price * this.days;
      this.application.totalprice += this.is.insurances[1].price * this.days;
      this.application.insurance2 = {id: 2};
    } else {
      this.application.insuranceprice -= this.is.insurances[1].price * this.days;
      this.application.totalprice -= this.is.insurances[1].price * this.days;
      this.application.insurance2 = null;
    }
  }

  selectLDW() {
    if (this.orderSummaryInfoForm.value.ldw) {
      this.application.insuranceprice += this.is.insurances[0].price * this.days;
      this.application.totalprice += this.is.insurances[0].price * this.days;
      this.application.insurance1 = {id: 1};
    } else {
      this.application.insuranceprice -= this.is.insurances[0].price * this.days;
      this.application.totalprice -= this.is.insurances[0].price * this.days;
      this.application.insurance2 = {id: 2};
    }
  }
}

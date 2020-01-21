import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../shared/services/application.service';
import {TimeslotService} from '../shared/services/timeslot.service';
import {UsStatesService} from '../shared/services/us-states.service';
import {InsuranceService} from '../shared/services/insurance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jsPDF';

@Component({
  selector: 'app-oder-detail-user',
  templateUrl: './oder-detail-user.component.html',
  styleUrls: ['./oder-detail-user.component.scss']
})
export class OderDetailUserComponent implements OnInit {

  application;
  timeSlot;
  id;
  orderSummaryInfoForm: FormGroup;
  truckInfo;
  days: number;
  mileprice: number;

  constructor(public aps: ApplicationService,
              private ts: TimeslotService,
              private fb: FormBuilder,
              public usStatesService: UsStatesService,
              public is: InsuranceService,
              private router: Router,
              private ps: ProductService,
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
      model: [{value: '', disabled: true}, [Validators.required]],
      plate: [{value: '', disabled: true}, [Validators.required]],
      vin: [{value: '', disabled: true}, [Validators.required]],
      plateState: [{value: '', disabled: true}, [Validators.required]],
      pickupdate: [{value: '', disabled: true}, [Validators.required]],
      returndate: [{value: '', disabled: true}, [Validators.required]],
      odometerin: [{value: '', disabled: true}, [Validators.required]],
      odometerout: [''],
      ldw: [''],
      sli: ['']
    });
    this.orderSummaryInfoForm.disable();
    this.id = this.ar.snapshot.params.orderid;
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
        this.mileprice = value1.truckDetail.truckModel.mileprice;
        this.timeSlot = value1;
        this.truckInfo = value1.truckDetail;
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
        if (!this.application.odometerin) {
          this.orderSummaryInfoForm.controls.odometerin.setValue(this.timeSlot.truckDetail.mileage);
        } else {
          this.orderSummaryInfoForm.controls.odometerin.setValue(this.application.odometerin);
        }
      });
    });
  }

  generatePDF() {
    // html2canvas(document.getElementById('orderSummary'), {
    //   windowWidth: 600,
    //   windowHeight: 900
    // }).then((canvas) => {
    //   const doc = new jsPDF();
    //   const formImg = canvas.toDataURL('image/png');
    //   const width = doc.internal.pageSize.getWidth();
    //   const height = doc.internal.pageSize.getHeight();
    //   doc.addImage(formImg, 'JPEG', 0, -100);
    //   // doc.autoPrint();
    //   // doc.output('pdfobjectnewwindow', 'order_summary.pdf');
    //   doc.save('order_summary.pdf');
    // });
    window.print();
  }

}

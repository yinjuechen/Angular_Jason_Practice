import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApplicationService} from '../shared/services/application.service';
import {AuthService} from '../shared/services/auth.service';
import {UsStatesService} from '../shared/services/us-states.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jsPDF';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/models/product';
import {TimeslotService} from '../shared/services/timeslot.service';
import {DateService} from '../shared/services/date.service';
import {Insurance} from '../shared/models/insurance';
import {InsuranceService} from '../shared/services/insurance.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnChanges {
  @Input() applicationData = null;
  user = null;
  applicationFormGroup: FormGroup;
  mindate = new Date();
  showApplicationForm: boolean;
  showCheckoutForm: boolean;
  showProtectionForm: boolean;
  applicationFormImg;
  checkoutFormGroup: FormGroup;
  checkoutFormImg;
  orderSummaryImg;
  pickUpDate;
  returnedDate;
  selectedTruck: Product;
  truckTotalPrice = 0;
  coverageTotalPrice = 0;
  insurances: Insurance[];
  insuranceForm: FormGroup;
  insuranceFormImg;
  days: number;
  // static validateDateFormat(dateInfo: FormControl): null | {} {
  //
  // }
  dateinput: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private  applicationService: ApplicationService,
              public usStatesService: UsStatesService,
              private ps: ProductService,
              private ts: TimeslotService,
              private ds: DateService,
              private is: InsuranceService,
              private  auth: AuthService
  ) {
  }

  ngOnInit() {
    // console.log(this.ps.currentProduct);
    this.pickUpDate = this.ds.pickUpDate;
    this.returnedDate = this.ds.returnDate;
    this.selectedTruck = this.ps.currentProduct;
    this.days = Math.ceil((this.returnedDate - this.pickUpDate) / (1000 * 60 * 60 * 24) + 1);
    this.truckTotalPrice = this.ps.currentProduct ? this.ps.currentProduct.price * this.days : 0;
    if (this.auth.user) {
      this.user = this.auth.user;
    } else {
      this.router.navigate(['/login']);
    }
    this.showApplicationForm = true;
    this.showCheckoutForm = false;
    this.showProtectionForm = false;
    this.applicationFormGroup = this.fb.group({
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
      driver_license_expired_date: ['', [Validators.required]]
    });
    // TODO: checkout form validation
    this.checkoutFormGroup = this.fb.group({
      creditCardName: ['', [Validators.required]],
      creditCardNumber: ['', [Validators.required]],
      creditCardExpiration: ['', [Validators.required]],
      creditCardCvv: ['', [Validators.required]],
      billingFirstName: ['', [Validators.required]],
      billingLastName: ['', [Validators.required]],
      billingAddress1: ['', [Validators.required]],
      billingAddress2: [''],
      billingCity: ['', [Validators.required]],
      billingState: ['', [Validators.required]],
      billingZip: ['', [Validators.required]]
    });
    if (!this.is.insurances) {
      this.is.getAllInsurances().subscribe(value => {
        this.insurances = value;
        this.is.insurances = value;
      });
    } else {
      this.insurances = this.is.insurances;
    }
    this.insuranceForm = this.fb.group({
      ldw: [''],
      sli: ['']
    });
  }

  ngOnChanges(): void {
    console.log('*************');
    console.log(this.applicationData);
    if (this.applicationData) {
      for (const key in this.applicationData) {
        if (this.applicationFormGroup.controls.hasOwnProperty(key)) {
          this.applicationFormGroup.controls[key].setValue(this.applicationData[key]);
        }
      }
      this.applicationFormGroup.controls.driver_license_expired_date.setValue(new Date(this.applicationData.driver_license_expired_date));
    }
  }

  goToProtection() {
    console.log(this.applicationFormGroup.value);
    const applicationContent = document.getElementById('applicationForm');
    html2canvas(applicationContent).then((canvas) => {
      this.applicationFormImg = canvas.toDataURL('image/png');
      this.showApplicationForm = false;
      this.showProtectionForm = true;
      this.showCheckoutForm = false;
      // console.log(this.applicataionFormImg);
    });
  }

  generateApplicationFormPdf() {
    const doc = new jsPDF();
    const todayDate = new Date();
    doc.setFontSize(15);
    doc.text(todayDate.toDateString(), 5, 8);
    doc.text('Person Info: ', 5, 14);
    doc.setLineWidth(0.2);
    doc.line(5, 16, 200, 16);
    doc.addImage(this.applicationFormImg, 'JPEG', 5, 23, 190, 90);
    // doc.output('dataurlnewwindow');
    doc.text('Payment Info', 5, 119);
    doc.line(5, 124, 200, 124);
    doc.addImage(this.checkoutFormImg, 'JPEG', 5, 126, 190, 100);
    doc.addPage();
    doc.text('Protection Coverage', 5, 12);
    doc.line(5, 14, 200, 14);
    doc.addImage(this.insuranceFormImg, 'JPEG', 5, 16, 190, 60);
    doc.text('Order Summary', 5, 88);
    doc.line(5, 75, 200, 75);
    doc.addImage(this.orderSummaryImg, 'JPEG', 5, 92);
    doc.save('test.pdf');
  }

  backToProtection() {
    this.showApplicationForm = false;
    this.showCheckoutForm = false;
    this.showProtectionForm = true;
  }

  submitOrder() {
    console.log('submit Order');
    const checkoutContent = document.getElementById('checkoutForm');
    html2canvas(checkoutContent).then((canvas) => {
      this.checkoutFormImg = canvas.toDataURL('image/png');
    });
    const orderSummaryContent = document.getElementById('orderSummary');
    html2canvas(orderSummaryContent).then((canvas) => {
      this.orderSummaryImg = canvas.toDataURL('image/png');
    });
    const application = this.applicationFormGroup.value;
    application.user = {id: this.auth.user.id};
    application.phone = '' + application.phone;
    application.order_date = new Date();
    application.creditcardnumber = this.checkoutFormGroup.value.creditCardNumber;
    application.billingfirstname = this.checkoutFormGroup.value.billingFirstName;
    application.billinglastname = this.checkoutFormGroup.value.billingLastName;
    application.billingaddress1 = this.checkoutFormGroup.value.billingAddress1;
    application.billingaddress2 = this.checkoutFormGroup.value.billingAddress2;
    application.billingcity = this.checkoutFormGroup.value.billingCity;
    application.billingstate = this.checkoutFormGroup.value.billingState;
    application.billingzip = this.checkoutFormGroup.value.billingZip;
    application.totalprice = this.truckTotalPrice + this.coverageTotalPrice;
    application.pickupdate = this.pickUpDate;
    application.returndate = this.returnedDate;
    application.insurance1 = this.insuranceForm.value.ldw ? {id: 1} : null;
    application.insurance2 = this.insuranceForm.value.sli ? {id: 2} : null;
    application.insuranceprice = this.coverageTotalPrice;
    application.truckprice = this.truckTotalPrice;
    // console.log(application.totalprice, application.pickupdate, application.returndate);
    // this.applicationService.addApplication(application).subscribe();
    const timeSlot = {
      startdate: this.pickUpDate,
      enddate: this.returnedDate,
      truckmodelid: this.ps.currentProduct.id
    };
    this.ts.addATimeSlot(timeSlot).subscribe((value) => {
      console.log(value);
      application.reservedid = value.id;
      this.applicationService.addApplication(application).subscribe((applicationValue) => {
        console.log(applicationValue);
        this.router.navigate(['/trucks']);
      }, error => {
        // TODO: handle error (i.e. toast)
        console.log('add application failed');
      });
    });
    this.generateApplicationFormPdf();
  }

  goToPayment() {
    console.log(this.insuranceForm);
    if (this.insuranceForm.value.ldw) {
      this.coverageTotalPrice = this.coverageTotalPrice + this.days * this.insurances[0].price;
    }
    if (this.insuranceForm.value.sli) {
      this.coverageTotalPrice = this.coverageTotalPrice + this.days * this.insurances[1].price;
    }
    const insuranceFormContent = document.getElementById('insuranceForm');
    html2canvas(insuranceFormContent).then((canvas) => {
      this.insuranceFormImg = canvas.toDataURL('image/png');
      this.showProtectionForm = false;
      this.showCheckoutForm = true;
      this.showApplicationForm = false;
    });
  }

  backToPersonInfo() {
    this.showApplicationForm = true;
    this.showCheckoutForm = false;
    this.showProtectionForm = false;
  }

}

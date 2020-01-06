import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApplicationService} from '../shared/services/application.service';
import {AuthService} from '../shared/services/auth.service';
import {UsStatesService} from '../shared/services/us-states.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jsPDF';
import {ReadVarExpr} from '@angular/compiler';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/models/product';
import {TimeslotService} from '../shared/services/timeslot.service';
import {DateService} from '../shared/services/date.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  user = null;
  applicationFormGroup: FormGroup;
  mindate = new Date();
  showApplicationForm: boolean;
  showCheckoutForm: boolean;
  applicationFormImg;
  checkoutFormGroup: FormGroup;
  checkoutFormImg;
  orderSummaryImg;
  pickUpDate;
  returnedDate;
  selectedTruck: Product;
  totalPrice: number;
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
              private  auth: AuthService
  ) {
  }

  ngOnInit() {
    // console.log(this.ps.currentProduct);
    this.pickUpDate = this.ds.pickUpDate;
    this.returnedDate = this.ds.returnDate;
    this.selectedTruck = this.ps.currentProduct;
    this.totalPrice = this.ps.currentProduct.price * Math.ceil((this.returnedDate - this.pickUpDate) / (1000 * 60 * 60 * 24) + 1);
    if (this.auth.user) {
      this.user = this.auth.user;
    } else {
      this.router.navigate(['/login']);
    }
    this.showApplicationForm = true;
    this.showCheckoutForm = false;
    this.applicationFormGroup = this.fb.group({
      firstname: ['', [Validators.required]],
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


  }

  nextProcess() {
    console.log(this.applicationFormGroup.value);
    const applicationContent = document.getElementById('applicationForm');
    html2canvas(applicationContent).then((canvas) => {
      this.applicationFormImg = canvas.toDataURL('image/png');
      this.showApplicationForm = false;
      this.showCheckoutForm = true;
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
    doc.text('Oder Summary', 5, 13);
    doc.line(5, 15, 200, 15);
    doc.addImage(this.orderSummaryImg, 'JPEG', 5, 18);
    doc.save('test.pdf');
  }

  back() {
    this.showApplicationForm = true;
    this.showCheckoutForm = false;
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
    application.totalprice = this.totalPrice;
    application.pickupdate = this.pickUpDate;
    application.returndate = this.returnedDate;
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
  }
}

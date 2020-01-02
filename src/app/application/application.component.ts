import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApplicationService} from '../shared/services/application.service';
import {AuthService} from '../shared/services/auth.service';
import {UsStatesService} from '../shared/services/us-states.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  user = null;
  applicationFormGroup: FormGroup;
  mindate = new Date();

  // static validateDateFormat(dateInfo: FormControl): null | {} {
  //
  // }
  dateinput: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private  applicationService: ApplicationService,
              public usStatesService: UsStatesService,
              private  auth: AuthService
  ) {
  }

  ngOnInit() {
    if (this.auth.user) {
      this.user = this.auth.user;
    } else {
      this.router.navigate(['/login']);
    }
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

  }

  nextProcess() {
    console.log(this.applicationFormGroup.value);
    const application = this.applicationFormGroup.value;
    application.user = {id: this.auth.user.id};
    application.phone = '' + application.phone ;
    application.order_date = new Date();
    console.log(application);
    this.applicationService.addApplication(application).subscribe();
  }
}

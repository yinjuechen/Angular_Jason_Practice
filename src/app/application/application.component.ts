import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../shared/services/department.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApplicationService} from '../shared/services/application.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  user = null;
  applicationFormGroup: FormGroup;

  constructor(private ds: DepartmentService,
              private fb: FormBuilder,
              private router: Router,
              private  applicationService: ApplicationService,
              private  auth: AuthService
  ) {}

  ngOnInit() {
    if (this.auth.user) {
      this.user = this.auth.user;
    } else {
      this.router.navigate(['/login']);
    }
    this.applicationFormGroup = this.fb.group({
      firstname: [`${this.user.firstname}`],
      lastname: [`${this.user.lastname}`],
      email: [`${this.user.email}`],
      cellphone: ['']
    });
  }

}

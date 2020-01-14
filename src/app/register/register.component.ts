import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../shared/services/register.service';
import {DepartmentService} from '../shared/services/department.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/models/user';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {debounceTime, switchMap} from 'rxjs/operators';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  userExisted = false;

  static validatePasswords(passwords: FormGroup): null | {} {
    const {password: p, confirmPassword: cp} = passwords.value;
    return p === cp ? null : {passwordsNotMatch: 'Passwords has to match!'};
  }

  constructor(private rs: RegisterService,
              private ds: DepartmentService,
              private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
  }


  ngOnInit() {
    // Initialize FormGroup
    this.registerFormGroup = this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          this.validateUserExisted
        ]],
        passwords: this.fb.group({
          password: ['', [Validators.minLength(8), Validators.required]],
          confirmPassword: ['', [Validators.minLength(8), Validators.required]]
        }, {validator: [RegisterComponent.validatePasswords]})
      }
    );
  }

  register() {
    console.log(this.ds.departments);
    const departmentId = this.registerFormGroup.value.department;
    const firstname = this.registerFormGroup.value.firstname;
    const lastname = this.registerFormGroup.value.lastname;
    const email = this.registerFormGroup.value.email;
    const password = this.registerFormGroup.value.passwords.password;
    const user = {firstname, lastname, email, password};
    this.rs.register(user).subscribe((value) => {
      console.log(value);
      if (value.success) {
        this.router.navigate([`/login`]);
      }
    }, (error) => {
    });
  }

  userExistedCheck($event) {
    this.registerFormGroup.controls.email.valueChanges.pipe(debounceTime(500),
      switchMap(() => {
        return this.auth.getAll();
      })).subscribe(value => {
      this.userExisted = value.some((val) => {
        return val.email === $event.target.value;
      });
    });
  }

  validateUserExisted  = (email: FormControl) => {
    return this.userExisted ? {emailTaken: 'This email is already registered'} : null;
  }
}

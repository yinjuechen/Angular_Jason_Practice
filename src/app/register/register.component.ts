import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../shared/services/register.service';
import {DepartmentService} from '../shared/services/department.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  departments = null;
  registerFormGroup: FormGroup;
  private email: FormControl;

  static validatePasswords(passwords: FormGroup): null | {} {
    const {password: p, confirmPassword: cp} = passwords.value;
    return p === cp ? null : {passwordsNotMatch: 'Passwords has to match!'};
  }

  constructor(private rs: RegisterService, private ds: DepartmentService, private fb: FormBuilder) {
  }


  ngOnInit() {
    // Initialize FormGroup
    this.registerFormGroup = this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        department: ['', [Validators.required]],
        passwords: this.fb.group({
          password: [''],
          confirmPassword: ['']
        }, {validator: [RegisterComponent.validatePasswords]})
      }
    );
    console.log(this.registerFormGroup);
    // Get departments
    this.ds.getDepartments().subscribe((value) => {
      console.log('**********', value);
      this.departments = value;
      this.ds.departments = value;
    }, () => {

    }, () => {

    });
  }

  register() {
    console.log(this.ds.departments);
    const departmentId = this.registerFormGroup.value.department;
    const firstname = this.registerFormGroup.value.firstname;
    const lastname = this.registerFormGroup.value.lastname;
    const email = this.registerFormGroup.value.email;
    const password = this.registerFormGroup.value.passwords.password;
    const department = this.ds.departments[departmentId - 1];
    const user = {firstname, lastname, email, password, department};
    this.rs.register(user).subscribe((value) => {

    }, (error) => {
    });
  }
}

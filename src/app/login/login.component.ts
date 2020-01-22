import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.auth.login(this.loginForm.value).subscribe((value) => {
      console.log(value);
      if (value.success) {
        this.auth.user = value.user;
        this.router.navigate(['/trucks']).then();
      } else {
        this.snackBar.open('Username or password does not match', 'OK', {
          duration: 1500,
          verticalPosition: 'top'
        });
      }
    }, (err) => {

    }, () => {

    });
  }
}

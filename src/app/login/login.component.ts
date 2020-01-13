import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
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
      }
    }, (err) => {
      console.log(err);
    }, () => {

    });
  }
}

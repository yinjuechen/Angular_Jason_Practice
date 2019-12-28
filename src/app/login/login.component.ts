import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  submit(ngForm) {
    this.auth.login(ngForm.value).subscribe((value) => {
      console.log(value);
      if (value.success) {
        this.auth.user = value.user;
        this.router.navigate(['/profile']).then();
      }
    }, (err) => {
      console.log(err);
    }, () => {

    });
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss']
})
export class ProductsHeaderComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout().subscribe((value: { success: boolean }) => {
      if (value.success) {
        this.auth.user = null;
        this.router.navigate(['/login']).then();
      }
    });
  }
}

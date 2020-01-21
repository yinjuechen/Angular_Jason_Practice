import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ApplicationService} from '../shared/services/application.service';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.scss']
})
export class OrderUserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userid', 'email', 'phone', 'pickupdate', 'returndate', 'order_date', 'detail'];
  orders;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private as: ApplicationService,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    if(!this.auth.user){
      this.router.navigate(['/login']);
    }
    this.as.getAllApplicationByUserId(this.auth.user.id).subscribe(value => {
      console.log(value);
      this.orders = new MatTableDataSource(value);
      this.orders.paginator = this.paginator;
      this.orders.sort = this.sort;
      this.orders.filterPredicate = (data, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) > -1;
      };
      console.log(this.orders);
    });
  }

  applyFilter($event) {
    this.orders.filter = $event.target.value.trim().toLowerCase();
  }

}

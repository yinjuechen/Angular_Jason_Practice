import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from '../shared/services/application.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Application} from '../shared/models/application';

@Component({
  selector: 'app-order-agent',
  templateUrl: './order-agent.component.html',
  styleUrls: ['./order-agent.component.scss']
})
export class OrderAgentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userid', 'email', 'phone', 'pickupdate', 'returndate', 'orderdate', 'detail'];
  orders;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private as: ApplicationService) {
  }

  ngOnInit() {
    this.as.getAllApplication().subscribe(value => {
      // let tmp = value.map(e => {
      //   return {
      //     id: e.id,
      //     userid: e.user.id,
      //     email: e.email,
      //     phone: e.phone,
      //     pickupdate: e.pickupdate,
      //     returndate: e.returndate,
      //     order_date: e.order_date,
      //     resesrvedid: e.reservedid
      //   };
      // });
      // console.log(tmp);
      this.orders = new MatTableDataSource(value);
      this.orders.paginator = this.paginator;
      this.orders.sort = this.sort;
      console.log(this.orders);
    });
  }

  applyFilter($event) {
    this.orders.filter = $event.target.value.trim().toLowerCase();
    console.log(this.orders);
  }
}

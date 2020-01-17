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
  displayedColumns: string[] = ['id', 'userid', 'email', 'phone', 'pickupdate', 'returndate', 'order_date', 'detail'];
  orders;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private as: ApplicationService) {
  }

  ngOnInit() {
    this.as.getAllApplication().subscribe(value => {
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

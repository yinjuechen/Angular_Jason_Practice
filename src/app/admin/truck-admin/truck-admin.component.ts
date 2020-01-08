import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-truck-admin',
  templateUrl: './truck-admin.component.html',
  styleUrls: ['./truck-admin.component.scss']
})
export class TruckAdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'plate', 'state', 'vin', 'mileage', 'autoinsurance', 'model'];
  trucks;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.ps.getAllTruckDetail().subscribe(value => {
      this.trucks = new MatTableDataSource(value);
      this.trucks.paginator = this.paginator;
      this.trucks.sort = this.sort;
      console.log(this.trucks);
    });
  }

  applyFilter($event) {
    this.trucks.filter = $event.target.value.trim().toLowerCase();
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProductService} from '../../shared/services/product.service';
import {TruckdetailAdminComponent} from './truckdetail-admin/truckdetail-admin.component';
import {TruckmodelAdminComponent} from './truckmodel-admin/truckmodel-admin.component';
import {TimeslotService} from '../../shared/services/timeslot.service';
import {TruckreservationAdminComponent} from './truckreservation-admin/truckreservation-admin.component';

@Component({
  selector: 'app-truck-admin',
  templateUrl: './truck-admin.component.html',
  styleUrls: ['./truck-admin.component.scss']
})
export class TruckAdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'plate', 'state', 'vin', 'mileage', 'autoinsurance', 'model', 'reservations'];
  trucks;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private ps: ProductService,
              private ts: TimeslotService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.ps.getAllTruckDetail().subscribe(value => {
      this.trucks = new MatTableDataSource(value);
      this.trucks.paginator = this.paginator;
      this.trucks.sort = this.sort;
      this.trucks.sortingDataAccessor = (data, property) => {
        if (property === 'model') {
          const truckModel = data.truckModel;
          return truckModel.brand + truckModel.model + truckModel.year;
        } else {
          return data[property];
        }
      };
      this.trucks.filterPredicate = (data, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) > -1;
      };
    });
  }


  applyFilter($event) {
    this.trucks.filter = $event.target.value.trim().toLowerCase();
  }

  openDetailDialog($event) {
    this.ps.getTruckDetailById($event.target.innerText).subscribe(value => {
      this.dialog.open(TruckdetailAdminComponent, {width: '70%', data: value});
    });
  }

  openModelDialog(element) {
    const id = element.truckModel.id;
    this.ps.getTruckModelById(id).subscribe(value => {
      this.dialog.open(TruckmodelAdminComponent, {width: '70%', data: value});
    });
  }

  openReservationDialog(element) {
    const id = element.id;
    this.ts.getTimeSlotByTruckDetail(id).subscribe(value => {
      this.dialog.open(TruckreservationAdminComponent, {width: '70%', data: value});
    });
  }
}

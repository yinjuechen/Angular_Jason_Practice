import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-truckreservation-admin',
  templateUrl: './truckreservation-admin.component.html',
  styleUrls: ['./truckreservation-admin.component.scss']
})
export class TruckreservationAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'truckid', 'startdate', 'enddate'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<TruckreservationAdminComponent>
              ) { }

  ngOnInit() {
    this.data = new MatTableDataSource(this.data);
    this.data.sort = this.sort;
  }

}

import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../shared/services/application.service';
import {TimeslotService} from '../shared/services/timeslot.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  applicatoin;
  timeslot;
  constructor(private aps: ApplicationService, private ts: TimeslotService, private ar: ActivatedRoute) { }

  ngOnInit() {
    const id = this.ar.snapshot.params.id;
    this.aps.getApplicationById(id).subscribe( value => {
      this.applicatoin = value;
      this.ts.getTimeSlotById(value.reservedid).subscribe(value1 => {
        this.timeslot = value1;
      });
    });
  }

}

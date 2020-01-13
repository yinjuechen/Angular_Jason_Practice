import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../shared/services/application.service';
import {TimeslotService} from '../../shared/services/timeslot.service';
import {element} from 'protractor';

declare var google: any;

@Component({
  selector: 'app-data-admin',
  templateUrl: './data-admin.component.html',
  styleUrls: ['./data-admin.component.scss']
})


export class DataAdminComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit() {
  }

}

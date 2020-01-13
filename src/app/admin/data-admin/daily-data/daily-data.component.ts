import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../shared/services/application.service';
import {TimeslotService} from '../../../shared/services/timeslot.service';

@Component({
  selector: 'app-daily-data',
  templateUrl: './daily-data.component.html',
  styleUrls: ['./daily-data.component.scss']
})
export class DailyDataComponent implements OnInit {
  applications;
  reservations;
  type = 'ColumnChart';
  data;
  title = 'Daily Order Amount';
  columnNames = ['Day', 'Orders'];
  options = {
    is3D: true,
    hAxis: {
      title: 'Days',
    }
  };

  constructor(
    private aps: ApplicationService,
  ) {
  }

  ngOnInit() {
    google.load('visualization',
      'current',
      {packages: ['corechart']});
    google.setOnLoadCallback(this.loadFinished);
  }

  loadFinished = () => {
    this.aps.getAllApplication().subscribe(value => {
      this.applications = value;
      const tmp = this.applications.map(e => {
        const d1 = new Date(e.order_date);
        const date = d1.getDate();
        return {[date]: 1};
      });
      this.data = tmp.reduce((obj: object[], ele) => {
        for (const key in ele) {
          obj[key] ? obj[key]++ : obj[key] = 1;
        }
        return obj;
      }, []).map((ele, idx) => {
        if (ele) {
          return [idx + '', ele];
        }
      }).filter(ele => {
        return ele !== undefined;
      });
    });
  };

  showDetail($event) {
    console.log($event.target.value);
  }
}

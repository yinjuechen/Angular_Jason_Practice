import {Component, OnInit} from '@angular/core';
import {TimeslotService} from '../../../shared/services/timeslot.service';
import {group} from '@angular/animations';

@Component({
  selector: 'app-daily-model',
  templateUrl: './daily-model.component.html',
  styleUrls: ['./daily-model.component.scss']
})
export class DailyModelComponent implements OnInit {

  data;
  title = 'Reservations By Truck Model';
  type = 'PieChart';
  columnNames = ['Truck Model', 'Percentage'];
  options = {
    is3D: true
  };

  constructor(private ts: TimeslotService) {
  }

  ngOnInit() {
    google.load('visualization',
      'current',
      {packages: ['corechart']});
    google.setOnLoadCallback(this.loadFinished);
  }

  loadFinished = () => {
    this.ts.getAllTimeSlot().subscribe(value => {
      console.log(value);
      const res = this.groupBy(value, (item) => {
        return [item.truckmodelid];
      });
      this.data = res.map(e => {
        return [`${e[0].truckDetail.truckModel.brand}/${e[0].truckDetail.truckModel.model}/${e[0].truckDetail.truckModel.year}`
          , e.length];
      });
    });
  };

  groupBy(array, f) {
    const groups = {};
    array.forEach(e => {
      const key = JSON.stringify(f(e));
      groups[key] = groups[key] || [];
      groups[key].push(e);
    });
    return Object.keys(groups).map(e => {
      return groups[e];
    });
  }
}

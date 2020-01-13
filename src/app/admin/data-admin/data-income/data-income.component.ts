import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../shared/services/application.service';
import {GoogleChartComponent, GoogleChartPackagesHelper, GoogleChartsModule} from 'angular-google-charts';

@Component({
  selector: 'app-data-income',
  templateUrl: './data-income.component.html',
  styleUrls: ['./data-income.component.scss']
})
export class DataIncomeComponent implements OnInit {

  data = [];
  applications;
  type = 'LineChart';
  title = 'Daily Income';
  totalIncome = 0;
  columnNames = ['Day', 'Income'];
  options = {
    vAxis: {
      title: 'Income'
    },
    hAxis: {
      title: 'Days'
    }
  };

  constructor(private aps: ApplicationService) {
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
      console.log(value);
      const tmp = this.groupBy(this.applications, (e) => {
        return [new Date(e.order_date).toDateString()];
      });
      tmp.forEach(e => {
        let sum = 0;
        e.forEach(val => {
          sum += val.totalprice;
        });
        this.totalIncome += sum;
        const tmpDate = new Date(e[0].order_date);
        this.data = [...this.data, [`${tmpDate.getMonth() + 1}/${tmpDate.getDate() + 1}/${tmpDate.getFullYear()}`, sum]];
      });
      console.log(this.data);
      // this.data = [['1/7/2020', 123], ['1/8/2020', 123], ['1/9/2020', 123]];
      // console.log(this.data);
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

import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsStatesService} from '../../shared/services/us-states.service';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.scss']
})
export class TruckInfoComponent implements OnInit {
  @Input() truckInfoFormGroup: FormGroup;
  constructor(public statesService: UsStatesService) { }

  ngOnInit() {
    // this.truckInfoFormGroup = this.fb.group({
    //   plate: ['', [Validators.required]],
    //   state:['', [Validators.required]],
    //   vin:['', [Validators.required]],
    //   mileage:['', [Validators.required]]
    // });
  }

}

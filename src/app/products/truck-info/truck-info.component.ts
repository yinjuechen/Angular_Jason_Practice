import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.scss']
})
export class TruckInfoComponent implements OnInit {
  @Input() truckInfoFormGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.truckInfoFormGroup = this.fb.group({
    //   plate: ['', [Validators.required]],
    //   state:['', [Validators.required]],
    //   vin:['', [Validators.required]],
    //   mileage:['', [Validators.required]]
    // });
  }

}

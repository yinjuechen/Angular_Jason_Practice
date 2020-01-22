import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(private  dialogRef: MatDialogRef<PolicyComponent>) {
  }

  ngOnInit() {
  }

  close() {
    console.log('should close');
    this.dialogRef.close();
  }
}

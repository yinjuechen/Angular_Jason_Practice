import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  pickUpDate: Date;
  returnDate: Date;
  constructor() { }
}

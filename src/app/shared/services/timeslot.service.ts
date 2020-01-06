import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TruckTimeSlot} from '../models/truck-time-slot';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  constructor(private httpClient: HttpClient) {
  }

  addATimeSlot(timeSlot): Observable<TruckTimeSlot> {
    return this.httpClient.post<TruckTimeSlot>(`${environment.API_URL}/truckreserved`, timeSlot);
  }

  getTimeSlotById(id): Observable<TruckTimeSlot> {
    return this.httpClient.get<TruckTimeSlot>(`${environment.API_URL}/truckreserved/${id}`);
  }
}

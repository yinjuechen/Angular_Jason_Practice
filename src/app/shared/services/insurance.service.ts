import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Insurance} from '../models/insurance';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  insurances: Insurance[];
  constructor(private httpClient: HttpClient) {
  }

  getAllInsurances(): Observable<Insurance[]> {
    return this.httpClient.get<Insurance[]>(`${environment.API_URL}/insurances`, {withCredentials: true});
  }

  getInsuranceById(id: number): Observable<Insurance> {
    return this.httpClient.get<Insurance>(`${environment.API_URL}/insurances/${id}`, {withCredentials: true});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../models/department';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departments: Department[] = null;

  constructor(private httpClient: HttpClient) {
  }

  getDepartments(): Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${environment.API_URL}/mydepartments`);
  }

}

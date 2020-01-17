import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DepartmentService} from './department.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {
  }

  register(user): Observable<{ success: boolean }> {
    return this.httpClient.post<{ success: boolean }>(`${environment.API_URL}/myusers`, user, {withCredentials: true});
  }
}

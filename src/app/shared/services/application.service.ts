import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Application} from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient: HttpClient) {
  }

  addApplication(application) {
    return this.httpClient.post(`${environment.API_URL}/applications`, application);
  }

  getAllApplication(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(`${environment.API_URL}/applications`, {withCredentials: true});
  }

  getApplicationById(id): Observable<Application> {
    return this.httpClient.get<Application>(`${environment.API_URL}/applications/${id}`, {withCredentials: true});
  }

  updateApplicaction(application): Observable<Application> {
    return this.httpClient.put<Application>(`${environment.API_URL}/applications/${application.id}`, application, {withCredentials: true});
  }
  getAllApplicationByUserId(userid): Observable<Application[]> {
    return this.httpClient.get<Application[]>(`${environment.API_URL}/applications/user/${userid}`, {withCredentials: true});
  }
}

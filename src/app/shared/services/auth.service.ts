import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null;

  constructor(private httpclient: HttpClient) {
    this.checkLogin().subscribe((value: { success: boolean, user: any }) => {
      this.user = value.success ? value.user : null;
    });
  }

  login(user): Observable<{ success: boolean, user: any }> {
    const userParam = new HttpParams().append('email', user.email).append('password', user.password);
    return this.httpclient.post<{ success: boolean, user: any }>(`${environment.API_URL}/login`, userParam, {withCredentials: true});
  }

  logout() {
    return this.httpclient.get(`${environment.API_URL}/logout`, {withCredentials: true});
  }

  checkLogin() {
    return this.httpclient.get(`${environment.API_URL}/checklogin`, {withCredentials: true});
  }
  getAll(): Observable<User[]> {
    return this.httpclient.get<User[]>(`${environment.API_URL}/myusers`);
  }
}

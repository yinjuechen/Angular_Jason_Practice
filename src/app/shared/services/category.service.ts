import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories;

  constructor(private httpClient: HttpClient) {
  }

  getAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.API_URL}/categories`);
  }
}

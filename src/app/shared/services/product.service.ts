import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = null;

  constructor(private httpClient: HttpClient) {
  }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.API_URL}/trucks`);
  }

  AddProduct(product): Observable<{ success: boolean }> {
    return this.httpClient.post<{ success: boolean }>(`${environment.API_URL}/trucks`, product);
  }
}

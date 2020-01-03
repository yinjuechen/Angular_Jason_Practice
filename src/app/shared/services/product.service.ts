import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TruckTimeSlot} from '../models/truck-time-slot';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = null;
  currentProduct: Product;

  constructor(private httpClient: HttpClient) {
  }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.API_URL}/trucks`);
  }

  AddProduct(product): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.API_URL}/trucks`, product);
  }

  AddTruckDetail(truckDetail) {
    return this.httpClient.post(`${environment.API_URL}/truckdetails`, truckDetail);
  }

  // getAvailableTrucksByDate(startdate: string, enddate: string): Observable<Product[]> {
  //   return this.httpClient.get<Product[]>(`${environment.API_URL}/truckdetails/date/${startdate}/${enddate}`);
  // }
  getAlltrucksTimeSlot(): Observable<TruckTimeSlot[]> {
    return this.httpClient.get<TruckTimeSlot[]>(`${environment.API_URL}/truckreserved`);
  }
}

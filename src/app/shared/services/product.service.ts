import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TruckTimeSlot} from '../models/truck-time-slot';
import {TruckInfo} from '../models/truck-info';

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

  getAllTruckDetail(): Observable<TruckInfo[]> {
    return this.httpClient.get<TruckInfo[]>(`${environment.API_URL}/truckdetails`);
  }
  AddTruckDetail(truckDetail) {
    return this.httpClient.post(`${environment.API_URL}/truckdetails`, truckDetail);
  }

  getAvailableTruckModelsByDate(startdate: string, enddate: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.API_URL}/trucks/${startdate}/${enddate}`);
  }
  // getAlltrucksTimeSlot(): Observable<TruckTimeSlot[]> {
  //   return this.httpClient.get<TruckTimeSlot[]>(`${environment.API_URL}/truckreserved`);
  // }

  getReservedTimeSlot(pickUpDate: string, returnDate: string): Observable<TruckTimeSlot[]>{
    return this.httpClient.get<TruckTimeSlot[]>(`${environment.API_URL}/truckreserved/date/reserved/${pickUpDate}/${returnDate}`);
  }
}

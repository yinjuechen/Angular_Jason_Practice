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
    return this.httpClient.get<Product[]>(`${environment.API_URL}/trucks`, {withCredentials: true});
  }

  AddProduct(product): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.API_URL}/trucks`, product, {withCredentials: true});
  }

  getAllTruckDetail(): Observable<TruckInfo[]> {
    return this.httpClient.get<TruckInfo[]>(`${environment.API_URL}/truckdetails`, {withCredentials: true});
  }

  AddTruckDetail(truckDetail) {
    return this.httpClient.post(`${environment.API_URL}/truckdetails`, truckDetail, {withCredentials: true});
  }

  getAvailableTruckModelsByDate(startdate: string, enddate: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.API_URL}/trucks/${startdate}/${enddate}`, {withCredentials: true});
  }

  // getAlltrucksTimeSlot(): Observable<TruckTimeSlot[]> {
  //   return this.httpClient.get<TruckTimeSlot[]>(`${environment.API_URL}/truckreserved`);
  // }

  getReservedTimeSlot(pickUpDate: string, returnDate: string): Observable<TruckTimeSlot[]> {
    return this.httpClient.get<TruckTimeSlot[]>(`${environment.API_URL}/truckreserved/date/reserved/${pickUpDate}/${returnDate}`, {withCredentials: true});
  }

  getTruckDetailById(id: number): Observable<TruckInfo> {
    return this.httpClient.get<TruckInfo>(`${environment.API_URL}/truckdetails/${id}`, {withCredentials: true});
  }

  updateTruckDetail(truckInfo): Observable<TruckInfo> {
    return this.httpClient.put<TruckInfo>(`${environment.API_URL}/truckdetails/${truckInfo.id}`, truckInfo, {withCredentials: true});
  }

  getTruckModelById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.API_URL}/trucks/${id}`, {withCredentials: true});
  }

  updateTruckModel(truckModel): Observable<Product>{
    return this.httpClient.put<Product>(`${environment.API_URL}/trucks/${truckModel.id}`, truckModel, {withCredentials: true});
  }
}

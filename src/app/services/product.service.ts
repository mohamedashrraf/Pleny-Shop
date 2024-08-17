import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchTerm:BehaviorSubject<string> = new BehaviorSubject<string>('');
  loader:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  noOfNumCart:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(
    private http : HttpClient
  ) { }

  getAllProducts(limit:string = '9', skip:string = '0'): Observable<any> {
    return this.http.get(environment.apiUrl + `products?limit=${limit}&skip=${skip}`);
  }


  getAllCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + 'products/categories');
  }

  searchProduct(query:string , limit:string = '9', skip:string = '0'): Observable<any> {
    return this.http.get(environment.apiUrl + `products/search?q=${query}&limit=${limit}&skip=${skip}`);
  }

  getProductsByCategory(category:string , limit:string = '9', skip:string = '0'): Observable<any> {
    return this.http.get(environment.apiUrl + `products/category/${category}?limit=${limit}&skip=${skip}`);
  }

  addToCart(data:any): Observable<any> {
    let body = JSON.stringify(data);
    return this.http.post(environment.apiUrl + 'products/add' , body , {headers:{'Content-Type':'application/json'}})
  }
}

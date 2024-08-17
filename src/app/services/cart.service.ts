import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }


  addToCart(data:any):Observable<any>
  {
    let body = JSON.stringify(data);
    return this.http.post(environment.apiUrl + 'carts/add' , body , {headers:{'Content-Type':'application/json'}})
  }

  getUserCart(id:any):Observable<any>{
    return this.http.get(environment.apiUrl + 'carts/user/' + id)
  }


}

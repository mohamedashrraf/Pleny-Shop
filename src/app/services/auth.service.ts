import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userValidaty :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  Loader :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(
    private http : HttpClient
  ) { }

  login(data :Login):Observable<any>
  {
    let body = JSON.stringify(data);
    return this.http.post(environment.apiUrl + 'auth/login' , body , {headers:{'Content-Type':'application/json'}})
  }



}

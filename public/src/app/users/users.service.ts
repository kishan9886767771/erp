import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe: 'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  validatelogin() {
    return this._http.get('http://127.0.0.1:3000/users/validate-login',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  validatefirsttimesetup() {
    return this._http.get('http://127.0.0.1:3000/users/validate-first-time-setup',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  firsttimesetup(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/first-time-setup',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }
}

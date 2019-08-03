import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private _http: HttpClient ) {  }

  getUsersTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:3000/users/get-all-users')
      .subscribe(
        data => {
          resolve (data);
        },
        err => reject()
      );
    });
  }

  getUnitsTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:3000/users/get-all-units')
      .subscribe(
        data => {
          resolve (data);
        },
        err => reject()
      );
    });
  }

  getTenantsTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:3000/users/get-all-tenants')
      .subscribe(
        data => {
          resolve (data);
        },
        err => reject()
      );
    });
  }

  getRentalAgreementsTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:3000/users/get-all-rental-agreements')
      .subscribe(
        data => {
          resolve (data);
        },
        err => reject()
      );
    });
  }

  getInvoicesTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:3000/users/get-all-invoices')
      .subscribe(
        data => {
          resolve (data);
        },
        err => reject()
      );
    });
  }

  deleteUser(id: string) {
    return this._http.delete('http://127.0.0.1:3000/users/delete/'+id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  getUser(id: string) {
    return this._http.get('http://127.0.0.1:3000/users/get-User/'+id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  addUserToDB(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/add-user',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  editUser(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/edit-user',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  // Items

  addItem(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/add-item',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getItem(id: string) {
    return this._http.get('http://127.0.0.1:3000/users/get-item/'+id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteItem(id: string) {
    return this._http.delete('http://127.0.0.1:3000/users/delete-item/'+id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  editItem(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/edit-item',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getMaintenanceItemsTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:3000/users/get-all-maintenance-items')
      .subscribe(
        data => {
          resolve (data);
        },
        err => reject()
      );
    });
  }

  // Companies

  addCompany(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/add-company',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getCompany(id: string) {
    return this._http.get('http://127.0.0.1:3000/users/get-company/'+id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteCompany(id: string) {
    return this._http.delete('http://127.0.0.1:3000/users/delete-company/'+id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  editCompany(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/edit-company',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }



  getCompanyTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get('http://localhost:3000/users/get-all-companies')
      .subscribe(
        data => {
          resolve (data);
        },
        err => reject()
      );
    });
  }

}

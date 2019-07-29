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

  addUserToDB(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/add-user',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

}

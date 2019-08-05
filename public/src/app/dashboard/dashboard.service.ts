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

  // Units
  addUnit(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/add-unit',body,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteUnit(id: string) {
    return this._http.delete('http://127.0.0.1:3000/users/delete-unit/'+id, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

}

@Injectable()
export class AutoCompleterService {
  options = undefined;

  constructor(private http: HttpClient) {}

  getData(filter): Promise<any> {
    if (this.options) {
      return new Promise((resolve, reject) => {
        resolve(this.filterOptions(filter));
      });
    } else {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/users/get-all-units')
        .subscribe(
          data => {
            this.options = data;
            resolve(this.filterOptions(filter));
          },
          err => reject()
        );
      });
    }
  }

  filterOptions(filter): Array<String> {
    return (this.options.filter(
      option => this.fuzzysearch(filter, option.unitNo)
    ));
  }

  getCompanyData(filter): Promise<any> {
    if (this.options) {
      return new Promise((resolve, reject) => {
        resolve(this.filterCompanyOptions(filter));
      });
    } else {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/users/get-all-companies')
        .subscribe(
          data => {
            this.options = data;
            resolve(this.filterCompanyOptions(filter));
          },
          err => reject()
        );
      });
    }
  }

  filterCompanyOptions(filter): Array<String> {
    return (this.options.filter(
      option => this.fuzzysearch(filter, option.name)
    ));
  }

  // Credit: https://github.com/bevacqua/fuzzysearch
  fuzzysearch(needle, haystack): Boolean {
    const hlen = haystack.length;
    const nlen = needle.length;

    if (nlen > hlen) { return false; }

    needle = needle.toLowerCase();
    haystack = haystack.toLowerCase();

    let nIdx = 0;
    let hIdx = 0;
    while (nIdx < nlen) {
      if (hIdx >= hlen) { return false; }
      if (needle.charCodeAt(nIdx) === haystack.charCodeAt(hIdx++)) { nIdx++; }
    }

    return true;
  }
}

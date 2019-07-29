import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Injectable()
export class UserTableResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getUsersTableData()
      .then((tableData: any) => {
        return resolve({
          data: tableData
        });
      });
    });
  }
}

@Injectable()
export class MaintenanceItemsTableResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getMaintenanceItemsTableData()
      .then((tableData: any) => {
        return resolve({
          data: tableData
        });
      });
    });
  }
}

@Injectable()
export class CompanyTableResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getCompanyTableData()
      .then((tableData: any) => {
        return resolve({
          data: tableData
        });
      });
    });
  }
}

@Injectable()
export class UnitsTableResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getUnitsTableData()
      .then((tableData: any) => {
        return resolve({
          data: tableData
        });
      });
    });
  }
}

@Injectable()
export class TenantsTableResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getTenantsTableData()
      .then((tableData: any) => {
        return resolve({
          data: tableData
        });
      });
    });
  }
}

@Injectable()
export class RentalAgreementsTableResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getRentalAgreementsTableData()
      .then((tableData: any) => {
        return resolve({
          data: tableData
        });
      });
    });
  }
}

@Injectable()
export class InvoicesTableResolver implements Resolve<any> {

  constructor(private dashboardService: DashboardService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getInvoicesTableData()
      .then((tableData: any) => {
        return resolve({
          data: tableData
        });
      });
    });
  }
}
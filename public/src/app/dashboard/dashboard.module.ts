import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { DashboardService } from './dashboard.service';
import { UserTableResolver, MaintenanceItemsTableResolver, CompanyTableResolver, UnitsTableResolver, TenantsTableResolver, RentalAgreementsTableResolver, InvoicesTableResolver } from './dashboard.resolver';

import { RegisterModalComponent } from './user-management/register/register.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RemindersComponent } from './reminders/reminders.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RentalAgreementsComponent } from './rental-agreements/rental-agreements.component';
import { TenantsComponent } from './tenants/tenants.component';
import { UnitsComponent } from './units/units.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BackupRestoreComponent } from './backup-restore/backup-restore.component';
import { CompaniesComponent } from './companies/companies.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';

import { NouisliderModule } from 'ng2-nouislider';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CompaniesRegisterComponent } from './companies/companies-register/companies-register.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RemindersComponent,
    InvoicesComponent,
    RentalAgreementsComponent,
    TenantsComponent,
    UnitsComponent,
    UserManagementComponent,
    BackupRestoreComponent,
    CompaniesComponent,
    ManageItemsComponent,
    RegisterModalComponent,
    CompaniesRegisterComponent
  ],
  imports: [
    NouisliderModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    CoreModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TransferHttpCacheModule,
    DashboardRoutingModule
  ],
  entryComponents:[
    RegisterModalComponent
  ],
  providers: [
    DashboardService,
    UserTableResolver,
    MaintenanceItemsTableResolver,
    CompanyTableResolver,
    UnitsTableResolver,
    TenantsTableResolver,
    RentalAgreementsTableResolver,
    InvoicesTableResolver
  ]
})
export class DashboardModule { }

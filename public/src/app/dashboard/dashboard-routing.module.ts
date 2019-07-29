import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RemindersComponent } from './reminders/reminders.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RentalAgreementsComponent } from './rental-agreements/rental-agreements.component';
import { TenantsComponent } from './tenants/tenants.component';
import { UnitsComponent } from './units/units.component';
import { CompaniesComponent } from './companies/companies.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BackupRestoreComponent } from './backup-restore/backup-restore.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';
import { Error404PageResolver } from '../core';
import { UserTableResolver, MaintenanceItemsTableResolver, CompanyTableResolver, UnitsTableResolver, TenantsTableResolver, RentalAgreementsTableResolver, InvoicesTableResolver } from './dashboard.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'reminders', pathMatch: 'full' },
  {
    path: 'reminders', component: DashboardComponent,
    children: [ { path:'', component: RemindersComponent } ]
  },
  {
    path: 'invoices', component: DashboardComponent,
    children: [ { path:'', component: InvoicesComponent } ],
    resolve: {
      tableData: InvoicesTableResolver
    }
  },
  {
    path: 'rental-agreements', component: DashboardComponent,
    children: [ { path:'', component: RentalAgreementsComponent } ],
    resolve: {
      tableData: RentalAgreementsTableResolver
    }
  },
  {
    path: 'tenants', component: DashboardComponent,
    children: [ { path:'', component: TenantsComponent } ],
    resolve: {
      tableData: TenantsTableResolver
    }
  },
  {
    path: 'units', component: DashboardComponent,
    children: [ { path:'', component: UnitsComponent } ],
    resolve: {
      tableData: UnitsTableResolver
    }
  },
  {
    path: 'companies', component: DashboardComponent,
    children: [ { path:'', component: CompaniesComponent } ],
    resolve: {
      tableData: CompanyTableResolver
    }
  },
  {
    path: 'manage-items', component: DashboardComponent,
    children: [ { path:'', component: ManageItemsComponent } ],
    resolve: {
      tableData: MaintenanceItemsTableResolver
    }
  },
  {
    path: 'user-management', component: DashboardComponent,
    children: [ { path:'', component: UserManagementComponent } ],
    resolve: {
      tableData : UserTableResolver
    }
  },
  {
    path: 'backup-restore', component: DashboardComponent,
    children: [ { path:'', component: BackupRestoreComponent } ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

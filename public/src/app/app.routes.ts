import { Routes } from '@angular/router';
import { Error404PageComponent, Error404PageResolver } from './core';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/dashboard/reminders', pathMatch: 'full' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {
    path: '404',
    redirectTo: '/dashboard/reminders'
  },
  {
    // There's a bug that's preventing wild card routes to be lazy loaded (see: https://github.com/angular/angular/issues/13848)
    // That's why the Error page should be eagerly loaded
    path: '**',
    redirectTo: '/dashboard/reminders'
  }
];

import { Routes } from '@angular/router';

// import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainLayoutComponent } from './features/layout/main-layout.component';

import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';


export const routes: Routes = [
  {
    path: '',
    // canActivateChild: [authGuard, adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'layout' },
      { path: 'layout', component: MainLayoutComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
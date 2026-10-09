import { Routes } from '@angular/router';

// import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
// import { DashboardPage } from './features/dashboard/dashboard.page';
// import { LibraryPage } from './features/library/library.page';
// import { LoansPage } from './features/loans/loans.page';
// import { BookCreatePage } from './features/library/components/book-create/book-create.page';

import { Login } from './features/login/login';
import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';
import { MainLayoutComponent } from './main-layout.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authGuard, adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    //  { path: 'dashboard', component: DashboardPage },
    //  { path: 'library', component: LibraryPage },
    //  { path: 'library/new', component: BookCreatePage },
    //  { path: 'loans', component: LoansPage, canActivate: const [adminGuard] }
    ]
  },
  {
    path: 'login',
    component: Login
  },
  { path: '**', redirectTo: '' }
];
import { Routes } from '@angular/router';

// import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { ProductRead } from './features/product/read.product/product.read';
import { ProductCreate } from './features/product/create.product/product.create';
import { UserCreate } from './features/login/create.user/user.create';
import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';


export const routes: Routes = [
  {
    path: '',
    // canActivateChild: [authGuard, adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'productRead' },
      { path: 'productRead', component: ProductRead }
    ]
  },
  { path: 'productCreate', component: ProductCreate },
  { path: '**', redirectTo: '' },

  { path: 'USERCreate', component: UserCreate },
  { path: '**', redirectTo: '' }

  
];

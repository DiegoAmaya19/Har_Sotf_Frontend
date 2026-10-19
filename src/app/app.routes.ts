import { Routes } from '@angular/router';

// import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { ProductRead } from './features/product/read.product/product.read';
import { ProductCreate } from './features/product/create.product/product.create';
import { ProductMain } from './features/product/product.main';

import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';

export const routes: Routes = [
  {
    path: '',
    // canActivateChild: [authGuard, adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'productMain' },
      {
        path: 'productMain', component: ProductMain,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'productRead'},
          { path: 'productRead', component: ProductRead },
          { path: 'productCreate', component: ProductCreate },
        ]
      },
],
  },

{ path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';

// import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { ProductMain } from './features/product/product.main';
import { ProductCreate } from './features/product/create.product/product.create';
import { ProductRead } from './features/product/read.product/product.read';
import { ProductUpdate } from './features/product/update.product/product.update';

import { LoginWeb } from './features/login/login';
//import { UserCreate } from './features/login/create.user/user.create';
import { authGuard } from './core/guard/auth-guard';
//import { adminGuard } from './core/guad/admin-guard';
import { SwitchPasswordComponent } from './features/login/switchpassword/switch-password';

export const routes: Routes = [
  {
    path: '',
    // canActivateChild: [authGuard, adminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'productCreate' },
      { path: 'productCreate', component: ProductCreate },
      { path: 'loginWeb', component: LoginWeb }
    ]
  },
  { path: 'productCreate', component: ProductCreate },
  { path: '**', redirectTo: '' },

  { path: 'loginWeb', component: LoginWeb },
  { path: '**', redirectTo: '' },
  { path: 'switchpassword', component: SwitchPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'productMain' },
      {
        path: 'productMain', component: ProductMain,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'productRead' },
          { path: 'productCreate', component: ProductCreate },
          { path: 'productRead', component: ProductRead },
        ]
      },
    ],
  },
  { path: 'productUpdate/:uuid', component: ProductUpdate },
  
  { path: '**', redirectTo: '' }
  
];

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { Login } from './features/login/login';


import { MainLayoutComponent } from './main-layout.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: 'login',
            component: Login
          }
          // {
          //   path: '**',
          //   component: '**'
          // }
        ]
      }
    ], withComponentInputBinding())
  ]
};
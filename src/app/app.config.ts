import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]

  // providers: [
  //   provideRouter([
  //     {
  //       path: '',
  //       component: DashboardComponent,
  //       children: [
  //         // {
  //         //   path: 'login',
  //         //   component: Login
  //         // }
  //         // {
  //         //   path: '**',
  //         //   component: '**'
  //         // }
  //       ]
  //     }
  //   ], withComponentInputBinding())
  // ]
};
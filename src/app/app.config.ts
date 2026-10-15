import { ApplicationConfig } from '@angular/core';
import { provideRouter} from '@angular/router';
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes)
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
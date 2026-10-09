import { CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);

  const info = jwtDecode((storage.getToken() ?? '').toString()) as { roles: string[] };
  
  if(info.roles.filter(r => r === "ROLE_ADMIN").length === 1) {
    return true;
  }
  console.log(info);
  return true;

};

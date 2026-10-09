import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  return storage.isAuthenticated();
  if(!storage.isAuthenticated()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true
};  

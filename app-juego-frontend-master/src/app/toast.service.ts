import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastMessage = new BehaviorSubject<string | null>(null);
  toastMessage$ = this.toastMessage.asObservable();

  showToast(message: string) {
    this.toastMessage.next(message);
    setTimeout(() => this.toastMessage.next(null), 3000);
  }
}
import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div
      *ngIf="toastMessage"
      class="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg"
    >
      {{ toastMessage }}
    </div>
  `,
})
export class ToastComponent {
  toastMessage: string | null = null;

  constructor(private toastService: ToastService) {
    this.toastService.toastMessage$.subscribe((message) => {
      this.toastMessage = message;
    });
  }
}
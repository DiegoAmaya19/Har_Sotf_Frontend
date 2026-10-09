import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-game-skeleton',
  template: `
    <div class="animate-pulse">
      <div class="h-40 bg-gray-300 rounded mb-4"></div>
      <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div class="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  `,
  styles: []
})
export class GameSkeletonComponent {}
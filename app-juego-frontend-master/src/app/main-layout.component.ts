import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside
        class="bg-gray-800 text-white w-64 flex-shrink-0 transition-all duration-300"
        [class.w-20]="isCollapsed"
      >
        <div class="p-4 text-center font-bold text-lg">
          <span *ngIf="!isCollapsed">GameTrack</span>
          <span *ngIf="isCollapsed">GT</span>
        </div>
        <nav>
          <ul>
            <li>
              <a
                routerLink="/dashboard"
                class="block py-2 px-4 hover:bg-gray-700"
                >Dashboard</a
              >
            </li>
            <li>
              <a
                routerLink="/games"
                class="block py-2 px-4 hover:bg-gray-700"
                >Catálogo de Juegos</a
              >
            </li>
            <li>
              <a
                routerLink="/matches"
                class="block py-2 px-4 hover:bg-gray-700"
                >Historial de Partidas</a
              >
            </li>
          </ul>
        </nav>
        <button
          class="absolute bottom-4 left-4 bg-gray-700 p-2 rounded"
          (click)="toggleSidebar()"
        >
          {{ isCollapsed ? 'Expandir' : 'Colapsar' }}
        </button>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <header class="bg-gray-100 p-4 flex justify-between items-center">
          <h1 class="text-xl font-bold">GameTrack</h1>
          <div class="flex items-center space-x-4">
            <span>Perfil</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Perfil"
              class="rounded-full w-10 h-10"
            />
          </div>
        </header>

        <!-- Content -->
        <main class="flex-1 p-4 bg-gray-50">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      aside {
        position: relative;
      }
    `,
  ],
})
export class MainLayoutComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
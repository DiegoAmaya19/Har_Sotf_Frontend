import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './features/layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.update((collapsed) => !collapsed);
  }
}

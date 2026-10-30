import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from './features/layout/main-layout.component';
import { LoginWeb } from './features/login/login.web';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, LoginWeb],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.update((collapsed) => !collapsed);
  }
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.update((collapsed) => !collapsed);
  }
}

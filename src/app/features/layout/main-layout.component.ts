import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  imports: [],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.update((collapsed) => !collapsed);
  }
}
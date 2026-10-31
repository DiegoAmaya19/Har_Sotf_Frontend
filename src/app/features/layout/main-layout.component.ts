import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, RouterLink],
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

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ProductRead } from '../product/read.product/product.read';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [ProductRead, RouterModule],
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
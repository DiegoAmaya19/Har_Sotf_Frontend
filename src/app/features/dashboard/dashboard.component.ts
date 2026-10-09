import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service'

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  protected readonly apiProduct = inject(AuthService);
  protected products = signal<any[]>([]);
  protected findProduct = signal<any | null>(null);

  stats = {
    topScore: 0,
    gamesCompleted: 0,
    hoursPlayed: 0,
  };
  progress = 0;

  ngOnInit(): void {

    this.apiProduct.getProdut().subscribe({
      next: (p) => {
        this.products.set(p);
        console.log('Products fetched successfully:', p)
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  get progressColor() {
    return this.progress >= 75
      ? 'green'
      : this.progress >= 50
        ? 'yellow'
        : 'red';
  }
}
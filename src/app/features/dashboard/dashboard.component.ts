import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service'

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `

    <p>Prueba de Conexion</p>

    <div>
      @for (p of products(); track p.uuid) {

        <p>{{p.nameProduct}}</p>
        <p>{{p.categoryProduct}}</p>
        <p>{{p.description}}</p>

      }
    </div>

    <div class="p-6">
      <h2 class="text-3xl font-bold mb-6 text-center">Dashboard</h2>

      <!-- Weekly Goal Progress -->
      <div class="flex justify-center mb-8">
        <div class="relative w-40 h-40">
          <div
            class="absolute inset-0 rounded-full border-8 border-blue-500"
            [style.borderColor]="progressColor"
            [style.borderWidth]="progress + 'px'"
          ></div>
          <div class="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {{ progress }}%
          </div>
        </div>
      </div>

      <!-- Stats Widgets -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
          <h3 class="text-lg font-bold">Top Score</h3>
          <p class="text-2xl">{{ stats.topScore }}</p>
        </div>
        <div class="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-md">
          <h3 class="text-lg font-bold">Juegos Completados</h3>
          <p class="text-2xl">{{ stats.gamesCompleted }}</p>
        </div>
        <div class="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-md">
          <h3 class="text-lg font-bold">Horas Jugadas</h3>
          <p class="text-2xl">{{ stats.hoursPlayed }}</p>
        </div>
      </div>
    </div>
  `,
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

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.apiProduct.getProdut().subscribe({
      next: (p) => {
        this.products.set(p);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.http.get('/api/stats/dashboard').subscribe((data: any) => {
      this.stats = data.stats;
      this.progress = data.weeklyGoalProgress;
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
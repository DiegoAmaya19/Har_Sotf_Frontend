import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStoreService } from '../../core/services/game-store.service';
import { GameService } from '../../core/services/game.service';
@Component({
  standalone: true,
  selector: 'app-games-catalog',
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <input
        type="text"
        placeholder="Buscar juegos..."
        class="border p-2 w-full mb-4"
        (input)="onSearch($event.target.value)"
      />

      <div *ngIf="gameStore.isLoading()" class="text-center">Cargando...</div>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          *ngFor="let game of gameStore.filteredGames()"
          class="border p-4 rounded shadow hover:shadow-lg"
        >
          <h3 class="font-bold">{{ game.title }}</h3>
          <p>{{ game.description }}</p>
          <button
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            (click)="markAsFavorite(game)"
          >
            {{ game.isFavorite ? 'Quitar de Favoritos' : 'Marcar como Favorito' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class GamesCatalogComponent {
  constructor(
    public gameStore: GameStoreService,
    private gameService: GameService
  ) {
    this.loadGames();
  }

  loadGames() {
    this.gameStore.setLoading(true);
    this.gameService.searchGames().subscribe(
      games => {
        this.gameStore.setGames(games);
        this.gameStore.setLoading(false);
      },
      () => this.gameStore.setLoading(false)
    );
  }

  onSearch(query: string) {
    // Implement search logic to filter games
  }

  markAsFavorite(game: any) {
    game.isFavorite = !game.isFavorite; // Optimistic UI update
    // Call backend to persist favorite status
  }
}
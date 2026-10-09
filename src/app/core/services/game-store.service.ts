import { Injectable, signal, computed } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameStoreService {
  games = signal<Game[]>([]);
  isLoading = signal<boolean>(false);

  filteredGames = computed(() => {
    return this.games().filter(game => {
      // Add filtering logic here (e.g., by genre or status)
      return true; // Placeholder for actual filter conditions
    });
  });

  setGames(games: Game[]) {
    this.games.set(games);
  }

  setLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }
}
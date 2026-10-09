import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly apiUrl = '/api/games/search';

  constructor(private http: HttpClient) {}

  searchGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
}
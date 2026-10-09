import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-matches',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6 max-w-lg mx-auto bg-gray-800 text-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Registrar Partida</h2>
      <form [formGroup]="matchForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label for="game" class="block text-sm font-medium">Juego</label>
          <select
            id="game"
            formControlName="game"
            class="w-full p-2 border rounded bg-gray-700 text-white"
          >
            <option value="" disabled>Selecciona un juego</option>
            <option *ngFor="let game of games" [value]="game.id">{{ game.title }}</option>
          </select>
          <div *ngIf="matchForm.get('game')?.invalid && matchForm.get('game')?.touched" class="text-red-500 text-sm">
            Selecciona un juego.
          </div>
        </div>

        <div class="mb-4">
          <label for="score" class="block text-sm font-medium">Puntaje</label>
          <input
            id="score"
            type="number"
            formControlName="score"
            class="w-full p-2 border rounded bg-gray-700 text-white"
          />
          <div *ngIf="matchForm.get('score')?.invalid && matchForm.get('score')?.touched" class="text-red-500 text-sm">
            Ingresa un puntaje válido (no negativo).
          </div>
        </div>

        <div class="mb-4">
          <label for="date" class="block text-sm font-medium">Fecha</label>
          <input
            id="date"
            type="date"
            formControlName="date"
            class="w-full p-2 border rounded bg-gray-700 text-white"
          />
          <div *ngIf="matchForm.get('date')?.invalid && matchForm.get('date')?.touched" class="text-red-500 text-sm">
            Ingresa una fecha válida.
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          [disabled]="matchForm.invalid"
        >
          Registrar
        </button>
      </form>
    </div>
  `,
})
export class MatchesComponent {
  matchForm: FormGroup;
  games = [
    { id: 1, title: 'Juego 1' },
    { id: 2, title: 'Juego 2' },
    { id: 3, title: 'Juego 3' },
  ];

  constructor(private fb: FormBuilder) {
    this.matchForm = this.fb.group({
      game: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.matchForm.valid) {
      console.log('Partida registrada:', this.matchForm.value);
      // Aquí puedes enviar los datos al backend
    }
  }
}
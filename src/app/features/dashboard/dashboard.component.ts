import { Component } from '@angular/core';

@Component({  
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  stats = {
    topScore: 0,
    gamesCompleted: 0,
    hoursPlayed: 0,
  };
  progress = 0;

  get progressColor() {
    return this.progress >= 75
      ? 'green'
      : this.progress >= 50
        ? 'yellow'
        : 'red';
  }
}
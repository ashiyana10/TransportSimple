import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Trip } from './trip.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title='';
  newTrip: Trip = { start: '', end: '' };
  trips: Trip[] = [];

  addTrip() {
    if (this.newTrip.start && this.newTrip.end) {
      this.trips.push({ ...this.newTrip });
      this.newTrip = { start: '', end: '' };
    }
  }

  // Determine level class
  getTripClass(index: number): string {
    if (index === 0) return 'level-1';

    const prev = this.trips[index - 1];
    const curr = this.trips[index];

    if (prev.end === curr.start) {
      return 'level-1'; // Continued trip
    }

    if (prev.start === curr.start && prev.end === curr.end) {
      return 'level-2'; // Duplicate trip
    }

    return 'level-1-arrow'; // New unconnected trip with arrow
  }

  isArrow(index: number): boolean {
    if (index === 0) return false;

    const prev = this.trips[index - 1];
    const curr = this.trips[index];

    // Show arrow if trip is not continued or is a new trip
    return !(prev.end === curr.start || (prev.start === curr.start && prev.end === curr.end));
  }
}

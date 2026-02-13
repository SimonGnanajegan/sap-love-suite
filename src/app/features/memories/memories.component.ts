import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-delivery-locations',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatDividerModule, MatListModule],
  templateUrl: './memories.component.html',
  styleUrl: './memories.component.scss'
})
export class MemoriesComponent {
  bikeTripProgress = signal(0);
  isRiding = signal(false);

  startBikeRide() {
    this.isRiding.set(true);
    this.bikeTripProgress.set(0);
    
    const interval = setInterval(() => {
      this.bikeTripProgress.update(p => p + 2);
      if (this.bikeTripProgress() >= 100) {
        clearInterval(interval);
        this.isRiding.set(false);
      }
    }, 100);
  }

  viewArchive() {
    alert('Accessing Memory Archive: "Sunset Department - 2022" 📂');
  }
}


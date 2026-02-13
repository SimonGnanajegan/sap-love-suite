import { Injectable, signal } from '@angular/core';

export interface Milestone {
  title: string;
  status: 'Completed' | 'Ongoing' | 'Pending';
  date: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoveService {
  
  // Love Data Constants
  readonly START_DATE = new Date('2022-09-29T00:00:00'); // Corrected to Sep 29, 2022
  readonly LOVE_CODE = '144';
  
  // State
  loveLevel = signal(100);
  smilesDetected = signal(9999);
  daysTogether = signal(0);
  milestones = signal<Milestone[]>([
    { date: '2022-09-29', title: 'First Chat (Connection Active)', status: 'Completed', icon: 'chat' },
    { date: '2023-02-14', title: 'First Valentine', status: 'Completed', icon: 'favorite' },
    { date: '2023-02-26', title: 'First Meeting', status: 'Completed', icon: 'event' },
    { date: 'Soon', title: 'Forever Deployment', status: 'Ongoing', icon: 'all_inclusive' }
  ]);

  constructor() {
    this.calculateDays();
    setInterval(() => this.calculateDays(), 1000 * 60 * 60); // Update every hour
  }

  private calculateDays() {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - this.START_DATE.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    this.daysTogether.set(diffDays);
  }

  getHeartbeat() {
    return '144 bpm'; // Easter egg constant
  }

  // Public methods to modify state if needed
  incrementLove(amount: number) {
    this.loveLevel.update(l => l + amount);
  }

  updateSmiles(count: number) {
    this.smilesDetected.set(count);
  }

  // Global Extras
  triggerError144(snackBar: any) {
    snackBar.open('Error 144: System Overridden by Excessive Love! ❤️', 'Aww', {
      duration: 4000,
      panelClass: ['love-error-snackbar']
    });
  }

  initNotifications(snackBar: any) {
    const messages = [
      'New Shipment from Heart Headquarters 📦',
      'Status Update: Miss You 3000 🥺',
      'Reminder: Drink Water & Smile 💧',
      'System Alert: Cuteness Overload Detected ⚠️'
    ];

    setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      if (Math.random() > 0.7) { // 30% chance to show notification
        snackBar.open(`🔔 ${randomMsg}`, 'View', { duration: 3000 });
      }
    }, 45000); // Check every 45 seconds
  }
}

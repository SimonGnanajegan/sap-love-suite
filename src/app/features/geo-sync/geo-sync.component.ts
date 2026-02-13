import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-geo-sync',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './geo-sync.component.html',
  styleUrl: './geo-sync.component.scss'
})
export class GeoSyncComponent implements OnDestroy {
  trackingId = 'SHIP-MU-BOO-144';
  
  timelineEvents = [
    { status: 'Order Placed 💙', date: 'Sep 29, 2022', completed: true },
    { status: 'Packed with Emotions ❤️', date: 'Feb 14, 2023', completed: true },
    { status: 'Out for Delivery 🏍', date: 'Processing', completed: true },
    { status: 'Waiting at Kovalam Bridge 🌊', date: 'Transit Point', completed: true },
    { status: 'Delivered to Boo’s Heart 💘', date: 'Estimated: Forever', completed: false, current: true }
  ];

  heartbeat = signal('active');

  constructor() {}

  ngOnDestroy() {}
}

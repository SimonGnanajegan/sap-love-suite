import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoveService } from '../../core/services/love.service';

interface Tile {
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  value?: string | number;
  unit?: string;
  cols: number;
  rows: number;
  color?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tiles: Tile[] = [
    { title: 'Active Orders', subtitle: 'Our Love Order', icon: 'shopping_bag', route: '/active-order', value: '1', unit: 'Order', cols: 2, rows: 1, color: '#e3f2fd' },
    { title: 'Order Analytics', subtitle: '1233 Days Data', icon: 'analytics', route: '/analytics', value: '100%', unit: 'Love', cols: 1, rows: 1, color: '#fff3e0' },
    { title: 'Shipment Tracking', subtitle: 'Long Distance', icon: 'local_shipping', route: '/geo-sync', value: 'In Transit', unit: '', cols: 1, rows: 1, color: '#e8f5e9' },
    { title: 'Delivery Locations', subtitle: 'Kovalam Memory', icon: 'map', route: '/memories', value: 'Saved', unit: '', cols: 1, rows: 1, color: '#fce4ec' },
    { title: 'Special Delivery', subtitle: 'Bike Trip', icon: 'two_wheeler', route: '/memories', value: 'Delivered', unit: '', cols: 1, rows: 1, color: '#f3e5f5' },
    { title: 'Approval Queue', subtitle: 'Final Proposal', icon: 'verified', route: '/workflow', value: 'Pending', unit: 'Action', cols: 2, rows: 1, color: '#e8eaf6' },
    { title: 'Customer Master', subtitle: 'Rish Profile', icon: 'account_circle', route: '/profile', value: 'Diamond', unit: '', cols: 1, rows: 1, color: '#fff8e1' },
    { title: 'System Logs', subtitle: 'Chat History', icon: 'terminal', route: '/chat-log', value: 'Secure', unit: '', cols: 1, rows: 1, color: '#eceff1' }
  ];

  constructor(public loveService: LoveService) {}
}

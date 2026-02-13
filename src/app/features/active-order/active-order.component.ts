import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-active-order',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatChipsModule, MatIconModule],
  templateUrl: './active-order.component.html',
  styleUrl: './active-order.component.scss'
})
export class ActiveOrderComponent {
  orderDetails = {
    id: 'LUV-144',
    customer: 'Rish',
    creator: 'Simu',
    date: 'Sep 29, 2022',
    type: 'Lifetime Partnership',
    priority: 'Critical ❤️',
    status: 'In Progress (1233 Days Running)'
  };

  displayedColumns = ['item', 'quantity', 'status'];
  lineItems = [
    { item: 'Hugs', quantity: 'Unlimited', status: 'Active' },
    { item: 'Support', quantity: '24/7', status: 'Active' },
    { item: 'Laughs', quantity: '144 per day', status: 'Processing' },
    { item: 'Annoying You', quantity: 'Sometimes 😏', status: 'Scheduled' },
    { item: 'Forever Promise', quantity: '1', status: 'Pending Approval' }
  ];
}

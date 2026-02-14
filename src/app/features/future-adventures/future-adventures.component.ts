import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { animate, state, style, transition, trigger } from '@angular/animations';
import confetti from 'canvas-confetti';

export interface Adventure {
  id: string;
  name: string;
  location: string;
  category: string;
  priority: 'High' | 'Critical' | 'Premium' | 'Lifetime';
  status: 'Planned' | 'Awaiting Courage 😌' | 'Dream Locked 🔒' | 'Approved';
  description: string[];
  loveLevel?: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-future-adventures',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './future-adventures.component.html',
  styleUrl: './future-adventures.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FutureAdventuresComponent {
  
  displayedColumns: string[] = ['id', 'name', 'priority', 'category', 'status', 'action'];
  isTimelineView = signal(false);
  expandedElement: Adventure | null = null;
  
  adventures = signal<Adventure[]>([
    {
      id: 'ADV-144-TR',
      name: 'Turkey Hot Air Balloon Ride',
      location: 'Cappadocia',
      category: 'Sky Experience',
      priority: 'High',
      status: 'Planned',
      description: [
        'Sunrise flight above magical valleys.',
        'Mu holding Boo\'s hand in the sky.',
        'Love Level: Above Clouds.'
      ]
    },
    {
      id: 'ADV-144-DXB',
      name: 'Skydiving in Dubai',
      location: 'Palm Jumeirah',
      category: 'Extreme Adventure',
      priority: 'Critical',
      status: 'Awaiting Courage 😌',
      description: [
        'Jumping from the sky together.',
        'Trust level: 100%.',
        'Heartbeat Sync: Maximum.'
      ]
    },
    {
      id: 'ADV-144-BIKE',
      name: 'Long Bike Trip – No Destination',
      location: 'Wherever Road Takes Us',
      category: 'Freedom Ride',
      priority: 'High',
      status: 'Planned',
      description: [
        'Just Mu & Boo.',
        'No return time.',
        'Only music, road, and wind.'
      ]
    },
    {
      id: 'ADV-144-KOV',
      name: 'One Week Stay – Kovalam Leela Palace',
      location: 'Kovalam Cliff View',
      category: 'Luxury Retreat',
      priority: 'Premium',
      status: 'Planned',
      description: [
        'Ocean view mornings.',
        'Balcony sunsets.',
        'No alarms. No stress. Only us.'
      ]
    },
    {
      id: 'ADV-144-KASH',
      name: 'Live in Jammu & Kashmir – Only Us',
      location: 'Himalayas',
      category: 'World Disconnect Mode',
      priority: 'Lifetime',
      status: 'Dream Locked 🔒',
      description: [
        'No past world connection.',
        'No noise. No distractions.',
        'Just Leo-style peaceful mountain life.',
        'Snow mornings. Fireplace nights.'
      ]
    }
  ]);

  @ViewChild('approvalDialog') approvalDialog: any;

  constructor(private dialog: MatDialog) {}

  get totalPlanned() { return this.adventures().length; }
  get approvedCount() { return this.adventures().filter(a => a.status === 'Approved').length; }
  get priorityOrders() { return this.adventures().filter(a => a.priority === 'High' || a.priority === 'Critical').length; }

  toggleView() {
    this.isTimelineView.update(v => !v);
  }

  requestApproval(adventure: Adventure) {
    const dialogRef = this.dialog.open(this.approvalDialog, {
      width: '400px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.triggerConfetti();
        this.updateStatus(adventure, 'Approved');
      }
    });
  }

  updateStatus(adventure: Adventure, status: any) {
    this.adventures.update(list => 
      list.map(a => a.id === adventure.id ? { ...a, status: status } : a)
    );
  }

  triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'Approved': return 'accent';
      case 'Dream Locked 🔒': return 'warn';
      case 'Awaiting Courage 😌': return 'primary'; // Custom handling in CSS usually better
      default: return 'primary';
    }
  }
}

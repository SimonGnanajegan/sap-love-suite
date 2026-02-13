import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { LoveService, Milestone } from '../../core/services/love.service';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.scss'
})
export class LifecycleComponent {
  
  displayedColumns: string[] = ['name', 'date', 'status', 'approval'];
  selectedFilter = signal('All');
  filterOptions = ['All', 'Important Moments', 'Cute Memories'];

  dataSource = computed(() => {
    const all = this.loveService.milestones();
    const filter = this.selectedFilter();
    
    if (filter === 'All') return all;
    // Mock logic for filtering since we only have a few items
    if (filter === 'Important Moments') return all.filter(m => m.status === 'Completed');
    return all.filter(m => m.status === 'Ongoing');
  });

  constructor(public loveService: LoveService) {}
}

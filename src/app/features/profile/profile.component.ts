import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSlideToggleModule, MatIconModule, MatListModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  isTechnicalView = signal(false);

  profileData = [
    { label: 'Customer Name', value: 'Rish' },
    { label: 'Nickname', value: 'Boo ⚡️' },
    { label: 'Registered Partner', value: 'Mu ✨' },
    { label: 'Customer Since', value: 'Sep 29, 2022' },
    { label: 'Loyalty Tier', value: 'Diamond Forever 💎' },
    { label: 'Preferred Vendor', value: 'Simu' },
    { label: 'Common Code Used', value: '144' }
  ];

  technicalData = [
    { label: 'Relationship Status', value: 'Connected', icon: 'wifi' },
    { label: 'Distance', value: '623 km', icon: 'map' },
    { label: 'Latency', value: '0ms (Heart-to-Heart)', icon: 'speed' },
    { label: 'Protocol', value: 'LUV-144', icon: 'security' }
  ];
}

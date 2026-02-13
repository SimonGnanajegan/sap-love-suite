import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-log',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './chat-log.component.html',
  styleUrl: './chat-log.component.scss'
})
export class ChatLogComponent {
  logs = [
    { id: '001', message: 'Mu ✨ initiated conversation.', user: 'System' },
    { id: '144', message: 'Boo ⚡️ responded.', user: 'System' },
    { id: '365', message: 'Feelings detected.', user: 'System' },
    { id: '1233', message: 'Love Confirmed.', user: 'System' }
  ];
}

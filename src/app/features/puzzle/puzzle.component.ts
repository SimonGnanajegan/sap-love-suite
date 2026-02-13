import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

type AccessState = 'denied' | 'quiz' | 'granted';

@Component({
  selector: 'app-puzzle',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatRadioModule, FormsModule],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.scss'
})
export class PuzzleComponent {
  accessState = signal<AccessState>('denied');
  currentQuestionIndex = signal(0);
  
  questions = [
    { text: 'Who is the cutest?', options: ['Me', 'You', 'Us'], correct: 'Us' },
    { text: 'What is the client ID?', options: ['000', '144', '999'], correct: '144' },
    { text: 'Assign permanent role?', options: ['Friend', 'Partner', 'Soulmate'], correct: 'Soulmate' }
  ];

  selectedOption = signal<string>('');

  requestAuthorization() {
    this.accessState.set('quiz');
  }

  submitAnswer() {
    const currentQ = this.questions[this.currentQuestionIndex()];
    if (this.selectedOption() === currentQ.correct) {
      if (this.currentQuestionIndex() < this.questions.length - 1) {
        this.currentQuestionIndex.update(i => i + 1);
        this.selectedOption.set('');
      } else {
        this.accessState.set('granted');
      }
    } else {
      alert('Access Denied. Incorrect Answer. Try again.');
    }
  }
}

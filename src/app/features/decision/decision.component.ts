import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decision',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatDialogModule],
  templateUrl: './decision.component.html',
  styleUrl: './decision.component.scss'
})
export class DecisionComponent {
  isLoading = signal(true);
  loadingText = signal('Initializing Valentine Protocol...');
  showQuestion = signal(false);
  noBtnStyle = signal({});
  noBtnText = signal('No 💔');
  attemptCount = 0;

  constructor(private router: Router) {
    this.runLoadingSequence();
  }

  runLoadingSequence() {
    const steps = [
      { text: 'Validating emotional database...', time: 1000 },
      { text: 'Checking compatibility...', time: 2500 },
      { text: 'Analyzing past memories...', time: 4000 },
      { text: 'Result: 100% Match Found! ❤️', time: 5500 }
    ];

    steps.forEach(step => {
      setTimeout(() => this.loadingText.set(step.text), step.time);
    });

    setTimeout(() => {
      this.isLoading.set(false);
      this.showQuestion.set(true);
    }, 7000);
  }

  onYesClick() {
    this.triggerConfetti();
    setTimeout(() => {
      this.router.navigate(['/workflow']);
    }, 2000);
  }

  onNoHover() {
    this.attemptCount++;
    this.moveNoButton();
    this.updateNoButtonState();
  }

  onNoClick() {
    this.onNoHover(); // Treat click same as hover for mobile/fast clicks
  }

  private moveNoButton() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    this.noBtnStyle.set({
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      transition: 'all 0.3s ease'
    });
  }

  private updateNoButtonState() {
    if (this.attemptCount === 1) this.noBtnText.set('Are you sure? 🥺');
    if (this.attemptCount === 2) this.noBtnText.set('Really? 😢');
    if (this.attemptCount === 3) {
      this.noBtnText.set('Nice try 😌');
      this.noBtnStyle.update(s => ({ ...s, transform: 'rotate(180deg)' }));
    }
    if (this.attemptCount === 4) this.noBtnText.set('Yes ❤️');
    if (this.attemptCount >= 5) this.noBtnStyle.set({ display: 'none' });
  }

  @HostListener('document:keydown.y', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.showQuestion()) {
      this.onYesClick();
    }
  }

  triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

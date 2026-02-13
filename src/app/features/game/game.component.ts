import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;
  
  score = signal(0);
  gameStatus = signal<'start' | 'playing' | 'won'>('start');
  
  private paddle = { x: 0, width: 80, height: 10 };
  private hearts: { x: number, y: number, speed: number }[] = [];
  private canvasWidth = 0;
  private canvasHeight = 0;

  ngAfterViewInit() {
    this.initCanvas();
    window.addEventListener('resize', () => this.initCanvas());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', () => this.initCanvas());
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.canvasWidth = canvas.width = canvas.parentElement?.clientWidth || 600;
    this.canvasHeight = canvas.height = 400;
    this.ctx = canvas.getContext('2d')!;
    this.paddle.x = this.canvasWidth / 2 - this.paddle.width / 2;
    this.draw();
  }

  startGame() {
    this.score.set(0);
    this.hearts = [];
    this.gameStatus.set('playing');
    this.loop();
  }

  private loop() {
    if (this.gameStatus() !== 'playing') return;

    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  private update() {
    // Spawn hearts logic (approx 2% chance per frame)
    if (Math.random() < 0.02) {
      this.hearts.push({ 
        x: Math.random() * (this.canvasWidth - 20), 
        y: 0, 
        speed: 2 + Math.random() * 2 
      });
    }

    // Move hearts
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      const h = this.hearts[i];
      h.y += h.speed;

      // Collision with paddle
      if (
        h.y + 20 >= this.canvasHeight - 20 &&
        h.y <= this.canvasHeight - 10 &&
        h.x + 20 >= this.paddle.x &&
        h.x <= this.paddle.x + this.paddle.width
      ) {
        this.hearts.splice(i, 1);
        this.score.update(s => s + 1);
        if (this.score() >= 10) {
          this.gameStatus.set('won');
        }
      } 
      // Missed heart
      else if (h.y > this.canvasHeight) {
        this.hearts.splice(i, 1);
      }
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Paddle
    this.ctx.fillStyle = '#0a6ed1';
    this.ctx.fillRect(this.paddle.x, this.canvasHeight - 20, this.paddle.width, this.paddle.height);

    // Hearts
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#e91e63';
    for (const h of this.hearts) {
      this.ctx.fillText('❤️', h.x, h.y);
    }
  }

  movePaddle(event: MouseEvent) {
    if (this.gameStatus() !== 'playing') return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    this.paddle.x = Math.max(0, Math.min(this.canvasWidth - this.paddle.width, mouseX - this.paddle.width / 2));
  }
}

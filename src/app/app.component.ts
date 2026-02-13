import { Component, HostListener, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { AuthService } from './core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoveService } from './core/services/love.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private idleTimer: any;
  private readonly IDLE_TIMEOUT = 10000; // 10 seconds

  constructor(public auth: AuthService, private snackBar: MatSnackBar, private loveService: LoveService) {
    this.resetIdleTimer();
  }

  ngOnInit() {
    // 144 Easter Egg Listener could go here or be directive based
    if (this.auth.isAuthenticated()) {
      this.loveService.initNotifications(this.snackBar);
    }
  }

  @HostListener('window:mousemove')
  @HostListener('window:click')
  @HostListener('window:keypress')
  resetIdleTimer() {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.showIdleMessage();
    }, this.IDLE_TIMEOUT);
  }

  showIdleMessage() {
   
  }
}

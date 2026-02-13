import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { LoveService } from '../../services/love.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private logoClicks = 0;

  constructor(
    public auth: AuthService,
    public loveService: LoveService,
    private snackBar: MatSnackBar
  ) {}

  handleLogoClick() {
    this.logoClicks++;
    if (this.logoClicks === 5) {
      this.snackBar.open('🦄 Secret Unlocked: You are my 24/7 Deployment!', '💙', { duration: 5000 });
      this.logoClicks = 0;
    }
  }
}

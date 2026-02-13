import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = signal(false);
  private _currentUser = signal<string | null>(null);

  constructor(private router: Router) { } // Inject Router

  login(client: string, user: string, pass: string): boolean {
    // Enterprise Security Check 143
    if (client === '144' && pass.length > 0) { // Keep password check simple for demo or strict
       this._isAuthenticated.set(true);
       this._currentUser.set(user);
       return true;
    }
    return false;
  }

  logout() {
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  get isAuthenticated() { return this._isAuthenticated.asReadonly(); }
  get currentUser() { return this._currentUser.asReadonly(); }
}

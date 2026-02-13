import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common'; // For NgIf etc
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  loadingText = signal('Initializing...');
  errorMessage = signal('');

  private loadingMessages = [
    'Initializing Love Modules...',
    'Checking Emotional Database...',
    'Validating Heart Connection...',
    '✅ Connection Established'
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      client: ['144', Validators.required],
      user: new FormControl('Rish', [Validators.required]),
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { client, user, password } = this.loginForm.value;
      if (this.auth.login(client, user, password)) {
        this.startLoadingSequence();
      } else {
        this.errorMessage.set('Invalid credentials. Hint: Client is 144.');
      }
    }
  }

  private startLoadingSequence() {
    this.isLoading.set(true);
    let step = 0;

    const interval = setInterval(() => {
      if (step < this.loadingMessages.length) {
        this.loadingText.set(this.loadingMessages[step]);
        step++;
      } else {
        clearInterval(interval);
        this.router.navigate(['/dashboard']);
      }
    }, 1500);
  }
}

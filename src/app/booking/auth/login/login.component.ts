import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingsAuthService } from '@booking/core/services/bookings-auth.service';

@Component({
  selector: 'app-booking-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  readonly auth = inject(BookingsAuthService);

  readonly email = signal('');
  readonly sent  = signal(false);

  constructor() {
    // If auth resolves to admin while on this page (e.g. after OAuth redirect), navigate away.
    effect(() => {
      if (this.auth.state() === 'admin') {
        this.router.navigate(['/bookings'], { replaceUrl: true });
      }
    });
  }

  ngOnInit(): void {
    this.auth.initialize();
  }

  async signInWithGoogle(): Promise<void> {
    await this.auth.signInWithGoogle();
  }

  async sendMagicLink(): Promise<void> {
    const e = this.email();
    if (!e) return;
    await this.auth.signIn(e);
    this.sent.set(true);
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}

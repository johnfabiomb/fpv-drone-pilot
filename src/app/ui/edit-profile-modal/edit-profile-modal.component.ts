import { Component, Input, OnInit, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppModalComponent } from '@ui/modal/app-modal.component';
import { AuthService } from '@core/services/auth.service';
import { UserDataService } from '@core/services/user-data.service';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, AppModalComponent],
  template: `
    <app-modal [showClose]="!isFirstLogin" maxWidth="360px" (closeRequested)="onDismiss()">
      <div class="ep">
        <h2 class="ep__title">{{ isFirstLogin ? 'What should we call you? 👋' : 'Edit profile' }}</h2>
        <p class="ep__sub" *ngIf="isFirstLogin">Add your name so others can recognise you in groups and chats.</p>

        <div class="ep__field">
          <label class="ep__label">Name <span class="ep__required">*</span></label>
          <input
            class="ep__input"
            type="text"
            [ngModel]="displayName()"
            (ngModelChange)="displayName.set($event)"
            placeholder="Your name"
            maxlength="50"
            (keydown.enter)="save()"
            autofocus />
        </div>

        <div class="ep__field">
          <label class="ep__label">
            Phone
            <span class="ep__optional">optional</span>
          </label>
          <input
            class="ep__input"
            type="tel"
            [ngModel]="phone()"
            (ngModelChange)="phone.set($event)"
            placeholder="+356 xxxx xxxx"
            maxlength="30"
            (keydown.enter)="save()" />
          <span class="ep__hint">Shared with guides when you join a paid tour</span>
        </div>

        <p class="ep__error" *ngIf="error()">{{ error() }}</p>

        <div class="ep__actions">
          <button *ngIf="!isFirstLogin" class="ep__btn ep__btn--cancel" (click)="onDismiss()" [disabled]="saving()">
            Cancel
          </button>
          <button class="ep__btn ep__btn--save" (click)="save()" [disabled]="saving() || !displayName().trim()">
            {{ saving() ? 'Saving…' : 'Save' }}
          </button>
        </div>
      </div>
    </app-modal>
  `,
  styles: [`
    .ep {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .ep__title {
      font-size: 18px;
      font-weight: 700;
      color: var(--color-text-base);
      margin: 0;
    }

    .ep__sub {
      font-size: 13px;
      color: var(--color-text-muted);
      margin: -8px 0 0;
      line-height: 1.5;
    }

    .ep__field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .ep__label {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .ep__required { color: #e11d48; font-size: 13px; }

    .ep__optional {
      font-size: 11px;
      font-weight: 400;
      color: var(--color-text-muted);
      background: var(--color-bg-muted);
      border-radius: 4px;
      padding: 1px 6px;
    }

    .ep__input {
      width: 100%;
      height: 42px;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 0 12px;
      font-size: 14px;
      color: var(--color-text-base);
      background: var(--color-bg);
      box-sizing: border-box;
      transition: border-color var(--transition);
      outline: none;

      &:focus { border-color: var(--color-primary); }
      &::placeholder { color: var(--color-text-light); }
    }

    .ep__hint {
      font-size: 11.5px;
      color: var(--color-text-muted);
    }

    .ep__error {
      font-size: 12.5px;
      color: #e11d48;
      margin: 0;
    }

    .ep__actions {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }

    .ep__btn {
      flex: 1;
      height: 42px;
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity var(--transition);

      &:disabled { opacity: 0.5; cursor: not-allowed; }
      &:not(:disabled):hover { opacity: 0.85; }
    }

    .ep__btn--cancel {
      background: var(--color-bg-muted);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }

    .ep__btn--save {
      background: var(--color-primary);
      color: #fff;
    }
  `],
})
export class EditProfileModalComponent implements OnInit {
  @Input() isFirstLogin = false;
  @Output() saved     = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  private readonly authService     = inject(AuthService);
  private readonly userDataService = inject(UserDataService);

  readonly displayName = signal('');
  readonly phone       = signal('');
  readonly saving      = signal(false);
  readonly error       = signal<string | null>(null);

  ngOnInit(): void {
    const currentName  = this.authService.userDisplayName();
    const currentEmail = this.authService.userEmail();
    if (currentName && currentName !== currentEmail) {
      this.displayName.set(currentName);
    }
    const currentPhone = this.userDataService.phone();
    if (currentPhone) this.phone.set(currentPhone);
  }

  async save(): Promise<void> {
    const name = this.displayName().trim();
    if (!name) { this.error.set('Please enter your name.'); return; }
    this.saving.set(true);
    this.error.set(null);
    try {
      await this.userDataService.updateProfile({
        displayName: name,
        phone: this.phone().trim() || null,
      });
      this.saved.emit();
    } catch {
      this.error.set('Could not save. Please try again.');
    } finally {
      this.saving.set(false);
    }
  }

  onDismiss(): void {
    if (this.isFirstLogin) return;
    this.dismissed.emit();
  }
}

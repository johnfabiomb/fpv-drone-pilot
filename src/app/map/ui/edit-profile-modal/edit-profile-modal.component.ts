import { Component, ElementRef, Input, OnInit, Output, EventEmitter, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppModalComponent } from '@map/ui/modal/app-modal.component';
import { AuthService } from '@map/core/services/auth.service';
import { UserDataService } from '@map/core/services/user-data.service';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, AppModalComponent],
  template: `
    <app-modal [showClose]="!isFirstLogin" maxWidth="360px" (closeRequested)="onDismiss()">
      <div class="ep">
        <h2 class="ep__title">{{ isFirstLogin ? 'What should we call you? 👋' : 'Edit profile' }}</h2>
        <p class="ep__sub" *ngIf="isFirstLogin">Add your name so others can recognise you in groups and chats.</p>

        <!-- Avatar picker -->
        <div class="ep__avatar-section">
          <div class="ep__avatar-wrap" (click)="pickPhoto()">
            <div class="ep__avatar">
              <img *ngIf="displayedPhoto()" [src]="displayedPhoto()" alt="Profile photo" class="ep__avatar__img" referrerpolicy="no-referrer">
              <svg *ngIf="!displayedPhoto()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ep__avatar__guest">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <div class="ep__avatar__overlay" [class.ep__avatar__overlay--uploading]="uploadingPhoto()">
                <div *ngIf="uploadingPhoto()" class="ep__spinner"></div>
                <svg *ngIf="!uploadingPhoto()" width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4" fill="none" stroke="white" stroke-width="2"/>
                </svg>
              </div>
            </div>
          </div>
          <span class="ep__avatar__hint">{{ uploadingPhoto() ? 'Uploading…' : 'Tap to change photo' }}</span>
          <p class="ep__error ep__error--photo" *ngIf="photoError()">{{ photoError() }}</p>
        </div>
        <input #fileInput type="file" accept="image/*" style="display:none" (change)="onFileSelected($event)">

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
          <button class="ep__btn ep__btn--save" (click)="save()" [disabled]="saving() || uploadingPhoto() || !displayName().trim()">
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

    .ep__title { font-size: 18px; font-weight: 700; color: var(--color-text-base); margin: 0; }
    .ep__sub { font-size: 13px; color: var(--color-text-muted); margin: -8px 0 0; line-height: 1.5; }

    /* ── Avatar ─────────────────────────────────────────────────────── */

    .ep__avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .ep__avatar-wrap {
      cursor: pointer;
      border-radius: 50%;
      &:hover .ep__avatar__overlay { opacity: 1; }
    }

    .ep__avatar {
      position: relative;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      overflow: hidden;
      background: var(--color-bg-muted);
      border: 2px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ep__avatar__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }

    .ep__avatar__guest {
      width: 50%;
      height: 50%;
      color: var(--color-text-light);
    }

    .ep__avatar__overlay {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(0,0,0,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.15s;

      &--uploading { opacity: 1; }
    }

    .ep__spinner {
      width: 20px;
      height: 20px;
      border: 2.5px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .ep__avatar__hint {
      font-size: 11.5px;
      color: var(--color-text-muted);
    }

    .ep__error--photo { font-size: 11.5px; margin: 0; }

    /* ── Fields ─────────────────────────────────────────────────────── */

    .ep__field { display: flex; flex-direction: column; gap: 6px; }

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

    .ep__hint { font-size: 11.5px; color: var(--color-text-muted); }
    .ep__error { font-size: 12.5px; color: #e11d48; margin: 0; }

    .ep__actions { display: flex; gap: 8px; margin-top: 4px; }

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

    .ep__btn--cancel { background: var(--color-bg-muted); color: var(--color-text-muted); border: 1px solid var(--color-border); }
    .ep__btn--save { background: var(--color-primary); color: #fff; }
  `],
})
export class EditProfileModalComponent implements OnInit {
  @Input() isFirstLogin = false;
  @Output() saved     = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  @ViewChild('fileInput') private fileInput!: ElementRef<HTMLInputElement>;

  private readonly authService     = inject(AuthService);
  private readonly userDataService = inject(UserDataService);

  readonly displayName    = signal('');
  readonly phone          = signal('');
  readonly saving         = signal(false);
  readonly error          = signal<string | null>(null);
  readonly uploadingPhoto = signal(false);
  readonly photoError     = signal<string | null>(null);
  readonly uploadedUrl    = signal<string>('');

  // Shows the just-uploaded URL immediately; falls back to OAuth photo
  readonly displayedPhoto = computed(() =>
    this.uploadedUrl() || this.authService.userPhotoURL()
  );

  ngOnInit(): void {
    const currentName  = this.authService.userDisplayName();
    const currentEmail = this.authService.userEmail();
    if (currentName && currentName !== currentEmail) {
      this.displayName.set(currentName);
    }
    const currentPhone = this.userDataService.phone();
    if (currentPhone) this.phone.set(currentPhone);
  }

  pickPhoto(): void {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    // Reset input so the same file can be re-selected after an error
    (event.target as HTMLInputElement).value = '';

    this.uploadingPhoto.set(true);
    this.photoError.set(null);
    try {
      await this.userDataService.uploadAvatar(file);
      // userPhotoURL() will update via auth state change; also set locally for instant feedback
      const url = this.authService.userPhotoURL();
      if (url) this.uploadedUrl.set(url);
    } catch {
      this.photoError.set('Upload failed. Try a smaller image.');
    } finally {
      this.uploadingPhoto.set(false);
    }
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

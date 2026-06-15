import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EditProfileModalService {
  readonly mode   = signal<'edit' | 'first-login' | null>(null);
  readonly isOpen = computed(() => this.mode() !== null);

  open(mode: 'edit' | 'first-login' = 'edit'): void { this.mode.set(mode); }
  close(): void { this.mode.set(null); }
}

import { Injectable, signal } from '@angular/core';

export interface ProfileModalData {
  photoURL:     string;
  displayName:  string;
  levelId:      number;
  levelLabel:   string;
  isAdmin:      boolean;
  roleLabel?:   string;
  activeLabel?: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileModalService {
  readonly current = signal<ProfileModalData | null>(null);

  // True when the current user clicks their own avatar —
  // FooterComponent reacts to open the full account popup.
  readonly selfOpen = signal(false);

  show(data: ProfileModalData): void {
    this.current.set(data);
  }

  hide(): void {
    this.current.set(null);
  }

  openSelf(): void {
    this.selfOpen.set(true);
  }

  closeSelf(): void {
    this.selfOpen.set(false);
  }
}

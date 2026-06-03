import { Component, DestroyRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '@ui/panel-shell/panel-shell.component';
import { MapBridgeService } from '@core/services/map-bridge.service';
import { NotificationService, AppNotification, NOTIF_ICONS } from '@core/services/notification.service';
import { EditProfileModalService } from '@core/services/edit-profile-modal.service';
import { SeoService } from '@core/services/seo.service';
import { Location } from '@core/models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, PanelShellComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  private readonly platformId       = inject(PLATFORM_ID);
  private readonly destroyRef       = inject(DestroyRef);
  private readonly seo              = inject(SeoService);
  private readonly editProfileModal = inject(EditProfileModalService);
  readonly bridge                   = inject(MapBridgeService);
  readonly router                   = inject(Router);
  readonly notifService             = inject(NotificationService);

  readonly icons = NOTIF_ICONS;

  ngOnInit(): void {
    this.seo.setPage('notifications');
    if (!isPlatformBrowser(this.platformId)) return;

    // Always refetch on open so the panel reflects current server state,
    // even if a realtime event was missed.
    void this.notifService.load();

    this.bridge.enterPanelMode([]);

    this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc: Location | null) => {
        if (loc) this.router.navigate(['/malta/locations', loc.slug]);
      });
  }

  async onNotifClick(notif: AppNotification): Promise<void> {
    if (!notif.is_read) await this.notifService.markRead(notif.id);
    if (!notif.action_url) return;

    if (notif.action_url === '#edit-profile') {
      this.router.navigate(['/malta']);
      setTimeout(() => this.editProfileModal.open('edit'), 150);
    } else {
      this.router.navigateByUrl(notif.action_url);
    }
  }

  timeAgo(dateStr: string): string {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60)     return 'just now';
    if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }
}

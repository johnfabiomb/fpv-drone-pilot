import { Component, DestroyRef, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PanelShellComponent } from '@map/ui/panel-shell/panel-shell.component';
import { ExperienceDetailComponent } from '@map/features/experiences/experience-detail/experience-detail.component';
import { ShareButtonComponent } from '@map/ui/share-button/share-button.component';
import { SeoService } from '@map/core/services/seo.service';
import { InteractionTrackingService } from '@map/core/services/interaction-tracking.service';
import { MapBridgeService } from '@map/core/services/map-bridge.service';
import { NavigationService } from '@map/core/services/navigation.service';
import { Experience, Location as AppLocation, Provider } from '@map/core/models';
import { providers } from '@assets/providers.json';
import { findExperience, getExperiencePins, resolveExperienceBookUrl } from '@map/core/utils/experience.utils';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [CommonModule, PanelShellComponent, ExperienceDetailComponent, ShareButtonComponent],
  template: `
    <app-panel-shell
      [title]="experience?.title ?? ''"
      (closeRequested)="goBack()"
      (dragStart)="bridge.panel.onDragStart($event)"
      (dragMove)="bridge.panel.onDragMove($event)"
      (dragEnd)="bridge.panel.onDragEnd($event)"
      (bodyDragStart)="bridge.panel.startDrag($event)"
      (bodyDragMove)="bridge.panel.onDragMove($event)"
      (bodyDragEnd)="bridge.panel.onDragEnd($event)">

      <app-share-btn
        *ngIf="experience"
        panelActions
        [url]="shareUrl"
        [shareTitle]="experience.title"
        (shared)="tracking.trackProvider(provider!.id, 'shared')">
      </app-share-btn>

      <app-experience-detail
        *ngIf="experience && provider"
        [experience]="experience"
        [provider]="provider"
        (bookRequested)="onBookRequested()"
        (couponCopied)="tracking.trackProvider(provider.id, 'coupon_copy')"
        (experienceShared)="tracking.trackProvider(provider.id, 'shared')">
      </app-experience-detail>

    </app-panel-shell>
  `,
  styles: [':host { display: contents; }'],
})
export class ExperiencePageComponent implements OnInit {
  experience: Experience | null = null;
  provider: Provider | null = null;

  private readonly route      = inject(ActivatedRoute);
  private readonly router     = inject(Router);
  private readonly nav        = inject(NavigationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document   = inject(DOCUMENT);
  private readonly seo        = inject(SeoService);
  readonly tracking           = inject(InteractionTrackingService);
  readonly bridge             = inject(MapBridgeService);

  get shareUrl(): string {
    if (!this.experience) return '';
    const origin = isPlatformBrowser(this.platformId)
      ? this.document.location.origin
      : 'https://johnfabiomb.com';
    return `${origin}/malta/experiences/${this.experience.id}`;
  }

  ngOnInit(): void {
    const all = providers as Provider[];

    if (isPlatformBrowser(this.platformId)) {
      // Keep the experience pins on the map (no provider pins).
      this.bridge.enterPanelMode([], { label: 'Back' });
      this.bridge.experiencePins.set(getExperiencePins(all));

      this.bridge.floatingBackBtnClicked$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.goBack());

      this.bridge.locationSelected$.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((loc: AppLocation | null) => {
          if (loc) this.router.navigate(['/malta/locations', loc.slug]);
        });
    }

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const found = findExperience(all, params.get('id') ?? '');
      if (!found) {
        this.router.navigate(['/malta']);
        return;
      }
      this.experience = found.experience;
      this.provider = found.provider;

      this.seo.setExperiencePage(this.experience, this.provider);

      if (isPlatformBrowser(this.platformId)) {
        this.tracking.trackProvider(this.provider.id, 'viewed');
        const spot = this.experience.spots[0];
        if (spot) this.bridge.fitPoint.set({ lat: spot.lat, lon: spot.lon });
      }
    });
  }

  onBookRequested(): void {
    if (!this.experience || !this.provider) return;
    const url = resolveExperienceBookUrl(this.experience, this.provider);
    if (!url) return;
    this.tracking.trackProvider(this.provider.id, 'book_now');
    this.bridge.interstitialProvider.set(this.provider);
    this.bridge.pendingNavUrl.set(url);
  }

  goBack(): void {
    this.nav.back(this.route.snapshot.queryParamMap);
  }
}

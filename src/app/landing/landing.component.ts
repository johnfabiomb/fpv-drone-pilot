import {
  Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal, viewChild, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * johnfabiomb.com root (`/`) — personal landing page selling John Montaño as a
 * Malta-based content creator, drone pilot, model promoter and web/software builder.
 * Standalone (outside the map chrome). Reveal animations are progressive enhancement:
 * content is fully visible without JS (good for crawlers / SSR); the browser adds the
 * `is-browser` class which arms the fade-in.
 */
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly doc = inject(DOCUMENT);

  /** Drone reels (Instagram) shown in the Work section — DTijMDzEfsJ leads. */
  readonly reels: SafeResourceUrl[] =
    ['DTijMDzEfsJ', 'DX6jf9tIiGN', 'DXyYeh5o8Qm', 'DXrMMXiCO97', 'DVtwmjlCGzo', 'DUThBzlEQ7F']
      .map(code => this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.instagram.com/p/${code}/embed`));

  readonly year = new Date().getFullYear();
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  // Reels carousel
  private readonly reelTrack = viewChild<ElementRef<HTMLElement>>('reelTrack');
  paused = false;                 // set by hover; pauses auto-advance
  private autoTimer?: ReturnType<typeof setInterval>;

  private observer?: IntersectionObserver;
  private onScroll?: () => void;

  ngOnInit(): void {
    // Legacy-URL compatibility. Old shared/indexed links hit the bare root with a hash route
    // (#/malta?…), query params (?locationId / ?title / ?redirect), or auth tokens — these used
    // to be handled by the map root when "/" redirected there. Now "/" is this landing, so
    // forward such URLs to /malta (keeping the query + hash) where MapRootComponent handles them.
    if (isPlatformBrowser(this.platformId) && this.isLegacyUrl()) {
      window.location.replace('/malta' + window.location.search + window.location.hash);
      return;
    }

    this.title.setTitle('John Montaño — Drone Pilot & Content Creator in Malta');
    const desc =
      'Malta-based content creator and drone pilot. Cinematic aerial video, social content ' +
      'and destination promotion — plus an interactive map of the 30 best places to visit in Malta.';
    const ogTitle = 'John Montaño — Content Creator & Drone Pilot, Malta';
    const img = 'https://johnfabiomb.com/assets/og-john.jpg';
    const imgAlt = 'John Montaño in Valletta, Malta — content creator & drone pilot';

    this.meta.updateTag({ name: 'description', content: desc });
    // Open Graph (overrides the site-wide map defaults baked into index.html)
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'John Montaño' });
    this.meta.updateTag({ property: 'og:title', content: ogTitle });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: 'https://johnfabiomb.com/' });
    this.meta.updateTag({ property: 'og:image', content: img });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    this.meta.updateTag({ property: 'og:image:alt', content: imgAlt });
    // Twitter (was still showing the old map copy/image)
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.meta.updateTag({ name: 'twitter:image', content: img });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imgAlt });

    this.setCanonical('https://johnfabiomb.com/');
    this.addPersonSchema(img);
  }

  /** Canonical URL — added once (server prerender), reused on the client. */
  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Person structured data so Google understands who John is (knowledge-graph eligible). */
  private addPersonSchema(image: string): void {
    if (this.doc.getElementById('ld-person')) return;
    const script = this.doc.createElement('script');
    script.id = 'ld-person';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'John Montaño',
      jobTitle: 'Content Creator & Drone Pilot',
      url: 'https://johnfabiomb.com/',
      image,
      email: 'creator@johnfabiomb.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Malta', addressCountry: 'MT' },
      sameAs: ['https://www.instagram.com/johnfabiomb/'],
      knowsAbout: ['Drone cinematography', 'Aerial filming', 'Content creation', 'Malta travel', 'Destination marketing'],
    });
    this.doc.head.appendChild(script);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.host.nativeElement as HTMLElement;
    el.classList.add('is-browser');

    // Fade sections in as they enter the viewport.
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); this.observer?.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    el.querySelectorAll('.reveal').forEach(n => this.observer!.observe(n));

    // Solidify the nav after a little scroll.
    this.onScroll = () => this.scrolled.set(window.scrollY > 24);
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // Auto-advance the reels carousel (unless the visitor prefers reduced motion).
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) this.autoTimer = setInterval(() => { if (!this.paused) this.advanceReels(1, false); }, 4500);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
    if (this.autoTimer) clearInterval(this.autoTimer);
  }

  /** Scroll the reels track by one card; loops back to the start at the end. */
  advanceReels(dir: 1 | -1, manual = true): void {
    const el = this.reelTrack()?.nativeElement;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.reel');
    const gap = parseFloat(getComputedStyle(el).columnGap || '20') || 20;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir === -1 && el.scrollLeft <= 8) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    else el.scrollBy({ left: dir * step, behavior: 'smooth' });
    if (manual) { this.paused = true; setTimeout(() => this.paused = false, 8000); } // give them time to browse
  }

  /** True for old-style links that belong to the map app, not this landing. */
  private isLegacyUrl(): boolean {
    const hash = window.location.hash;
    const q = new URLSearchParams(window.location.search);
    return hash.startsWith('#/')          // old hash routes: /#/malta?…
      || hash.includes('access_token=')   // auth redirect landed on /
      || q.has('locationId') || q.has('title') || q.has('redirect') || q.has('code') || q.has('ref');
  }

  scrollTo(id: string): void {
    this.menuOpen.set(false);
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

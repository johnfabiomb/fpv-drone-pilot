import { Component, HostListener } from '@angular/core';
import { FEATURES } from '../../feature-flags';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly features = FEATURES;
  readonly version = version;
  showAbout = false;

  toggleAbout(e: Event): void {
    e.stopPropagation();
    this.showAbout = !this.showAbout;
  }

  @HostListener('document:click')
  closeAbout(): void {
    this.showAbout = false;
  }
}

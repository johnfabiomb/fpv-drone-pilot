import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProviderCardComponent } from '../../components/provider-card/provider-card.component';
import { SeoService } from '../../shared/services/seo.service';
import { providers } from '../../../assets/providers.json';
import { Provider } from '../../shared/models';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, ProviderCardComponent],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
})
export class DealsComponent implements OnInit {
  readonly allProviders = [...providers];

  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage('list');
  }

  openProvider(provider: Provider): void {
    this.router.navigate(['/malta'], { queryParams: { provider: provider.id } });
  }

  goBack(): void {
    this.router.navigate(['/malta']);
  }
}

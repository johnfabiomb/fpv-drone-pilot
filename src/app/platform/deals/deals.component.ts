import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProviderCardComponent } from '../../components/provider-card/provider-card.component';
import { SeoService } from '../../shared/services/seo.service';
import { providers } from '../../../assets/providers.json';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, ProviderCardComponent],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
})
export class DealsComponent implements OnInit {
  readonly allProviders = [...providers];

  constructor(private router: Router, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage('list');
  }

  openProvider(provider: any): void {
    this.router.navigate(['/malta'], { queryParams: { provider: provider.id } });
  }

  goBack(): void {
    this.router.navigate(['/malta']);
  }
}

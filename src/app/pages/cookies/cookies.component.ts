import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.scss',
})
export class CookiesComponent implements OnInit {
  lastUpdated = 'June 2026';

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage('cookies');
  }
}

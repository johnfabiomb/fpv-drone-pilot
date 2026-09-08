import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '@map/core/services/seo.service';
import { FEATURES } from '../../feature-flags';

interface TrendLocation {
  num: number;
  name: string;
  id: number | null; // null = not in DB yet
}

const REVEALED: TrendLocation[] = [
  { num: 1,  name: 'Gozo Salt Pans, Xwejni',           id: 65 },
  { num: 2,  name: 'Ramla Bay, Gozo',                  id: 66 },
  { num: 3,  name: 'Argotti Botanic Gardens',           id: 67 },
  { num: 4,  name: 'Qarraba Cliffs Trail, Mellieħa',   id: 72 },
  { num: 5,  name: 'Hondoq ir-Rummien',                id: 68 },
  { num: 6,  name: 'Rdum il-Qammieh Viewpoint',        id: 69 },
  { num: 7,  name: 'Wied il-Mielaħ Window',            id: 23 },
  { num: 8,  name: 'Ta\' Kalanka Sea Cave',             id: 49 },
  { num: 9,  name: 'Fomm ir-Riħ',                      id: 36 },
  { num: 10, name: 'Ta\' Marija Cave',                  id: 44 },
  { num: 11, name: 'Tal-Mixta Cave',                    id: 41 },
  { num: 12, name: 'Wied il-Għasri',                   id: 63 },
  { num: 13, name: 'Hidden Rocky Beach near Ġnejna',   id: 70 },
  { num: 14, name: 'Għar ir-Riħ',                      id: 3  },
  { num: 15, name: 'Blata tal-Melħ Rock Passage',      id: 40 },
  { num: 16, name: 'Ix-Xaqqa Valley',                  id: 24 },
  { num: 17, name: 'Babu Valley / Wied Babu',          id: 59 },
  { num: 18, name: 'L-Għar ta\' Bla Saqaf',           id: 16 },
  { num: 19, name: 'Xlendi Tower Coastal Path',        id: 73 },
  { num: 20, name: 'Mini Inland Sea',                  id: 52 },
  { num: 21, name: 'Għar Ħanex Sea Cave',              id: 74 },
  { num: 22, name: 'Carolina Grotto, Xlendi',          id: 58 },
  { num: 23, name: 'Il-Kalanka, Delimara',             id: 75 },
  { num: 24, name: 'Paradise Bay',                     id: 55 },
  { num: 25, name: 'Imġiebaħ Beach',                   id: 76 },
  { num: 26, name: "L-Għar ta' Santa Katarina",        id: 77 },
  { num: 27, name: 'Tas-Simar Natural Arch',           id: 78 },
  { num: 28, name: 'Munxar Path',                       id: 8  },
  { num: 29, name: 'Dingli Cliffs',                     id: 19 },
];

const TOTAL = 30;

@Component({
  selector: 'app-top-places',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-places.component.html',
  styleUrl: './top-places.component.scss',
})
export class TopPlacesComponent {
  readonly revealed  = REVEALED;
  readonly locked    = Array.from({ length: TOTAL - REVEALED.length }, (_, i) => REVEALED.length + i + 1);
  readonly total     = TOTAL;
  readonly features  = FEATURES;

  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setTrendPage(REVEALED);
  }

  open(loc: TrendLocation): void {
    if (loc.id !== null) {
      // Navigate by numeric id — LocationPageComponent redirects to the canonical slug URL
      this.router.navigate(['/malta/locations', loc.id], { queryParams: { backTo: '30-places-2026' } });
    } else {
      this.router.navigate(['/malta'], { queryParams: { backTo: '30-places-2026' } });
    }
  }
}

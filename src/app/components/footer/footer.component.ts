import { Component } from '@angular/core';
import { FEATURES } from '../../feature-flags';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly features = FEATURES;
}

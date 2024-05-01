import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-malta-map',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ComponentsModule],
  templateUrl: './malta-map.component.html',
  styleUrl: './malta-map.component.scss'
})
export class MaltaMapComponent {
  map = true;
}

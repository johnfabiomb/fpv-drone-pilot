import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@Component({
    selector: 'app-malta-map',
    standalone: true,
    imports: [RouterOutlet, CommonModule, ComponentsModule],
    templateUrl: './malta-map.component.html',
    styleUrl: './malta-map.component.scss'
})
export class MaltaMapComponent implements OnInit {
  map = true;
  activeFilters: string[] = [];
  isModalOpen = false;
  isOnline = navigator.onLine;

  ngOnInit(): void {}

  @HostListener('window:online')
  onOnline() { this.isOnline = true; }

  @HostListener('window:offline')
  onOffline() { this.isOnline = false; }
}

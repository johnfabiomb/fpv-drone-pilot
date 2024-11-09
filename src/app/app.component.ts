import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fpv-pilot';
  map = false;
  ngAfterViewInit() {
    this.map = true
  }

  constructor(private location: Location) {}

  ngOnInit() {
    this.ensureHashInUrl();
  }
  
  ensureHashInUrl() {
    const currentUrl = window.location.href;
  
    // Check if the current URL does not already have a hash
    if (!currentUrl.includes('#')) {
      // Get the current path (without the hash) and ensure no duplicate slashes
      const currentPath = window.location.pathname;
  
      // Remove the leading slash if it's already there to prevent double slashes
      const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
      
      // Construct the new URL with the hash and path
      const newUrl = `${cleanPath}${window.location.search}`;
  
      // Replace the current state with the new URL, without reloading the page
      this.location.replaceState(newUrl);
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';



@NgModule({
  declarations: [
    MapComponent,
    FooterComponent,
    FilterBarComponent,
  ],
  exports: [
    MapComponent,
    FooterComponent,
    FilterBarComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class ComponentsModule { }

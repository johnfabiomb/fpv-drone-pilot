import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    MapComponent,
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class ComponentsModule { }

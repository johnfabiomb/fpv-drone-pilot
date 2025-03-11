import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { locations } from '../../../assets/locations.json';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

export enum ModalActions {
  EXPLORE = 'EXPLORE',
  GOOGLE_MAPS = 'GOOGLE_MAPS'
}

@Component({
    selector: 'app-map-modal',
  standalone: true,
    imports: [
        MatDialogModule,
        CommonModule,
        PipesModule
        // ComponentsModule
    ],
    templateUrl: './map-modal.component.html',
    styleUrl: './map-modal.component.scss'
})
export class MapModalComponent {

  @ViewChild('content') content!: ElementRef<any>;
  @ViewChild('frame') frame!: ElementRef<any>;


  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      console.log("clicked inside");
    } else {
      this.dialogRef.close();
    }
  }

  public recommendedLocations:any[] = [];

  constructor(
    public dialogRef: MatDialogRef<MapModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eRef: ElementRef,
      public router: Router,
          public activatedRoute:ActivatedRoute,
          public seoService: SeoService,
    @Inject(DOCUMENT) public document: Document) {
    document.body.style.overflow = 'hidden';
    this.recommendedLocations = this.getRandomLocations
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  ngAfterViewInit() {
    this.frame.nativeElement.style.display = 'none'
    this.content.nativeElement.style.flexDirection = 'row';
  }

  loaded() {
    setTimeout(() => {
      this.frame.nativeElement.style.display = 'block'
      this.content.nativeElement.style.flexDirection = 'column';
    }, 1500);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  explore() {
    this.dialogRef.close(ModalActions.EXPLORE);
  }

  googleMaps() {
    this.dialogRef.close(ModalActions.GOOGLE_MAPS);
  }

  clickon(data:any){
    const queryParams = { title: encodeURIComponent(data.title.replace(' ','-')) };
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} }).then(res=>{
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams, 
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        }
      );
    });


  }
  
  public get getRandomLocations() {
    const uniqueLocations = [...new Set(locations)]; // Ensure unique values
    if (uniqueLocations.length <= 9) {
      return uniqueLocations; // Return all if fewer than 10 locations exist
    }

    // Fisher-Yates Shuffle Algorithm for randomness
    for (let i = uniqueLocations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueLocations[i], uniqueLocations[j]] = [uniqueLocations[j], uniqueLocations[i]];
    }

    return uniqueLocations.slice(0, 9);// Return first 10 unique items 
  }
}

import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Renderer2, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentsModule } from '../components.module';
import { PipesModule } from '../../shared/pipes/pipes.module';


export enum ModalActions{
  EXPLORE= 'EXPLORE',
  GOOGLE_MAPS= 'GOOGLE_MAPS'
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
  clickout(event:Event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      console.log("clicked inside");
    } else {
      this.dialogRef.close();
    }
  }

  constructor(
    public dialogRef: MatDialogRef<MapModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eRef: ElementRef,
    @Inject(DOCUMENT) public document: Document){
       document.body.style.overflow = 'hidden';
    }
    
      ngOnDestroy(): void {
        document.body.style.overflow = 'auto';
      }

  ngAfterViewInit(){
    this.frame.nativeElement.style.display = 'none'
    this.content.nativeElement.style.flexDirection = 'row';
  }

  loaded(){
    setTimeout(() => {
      this.frame.nativeElement.style.display = 'block'
      this.content.nativeElement.style.flexDirection = 'column';
    }, 1500);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  explore(){
    this.dialogRef.close(ModalActions.EXPLORE);
  }
  
  googleMaps(){
    this.dialogRef.close(ModalActions.GOOGLE_MAPS);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltaMapComponent } from './malta-map.component';

describe('MaltaMapComponent', () => {
  let component: MaltaMapComponent;
  let fixture: ComponentFixture<MaltaMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaltaMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaltaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

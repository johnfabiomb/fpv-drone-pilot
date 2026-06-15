import { Component } from '@angular/core';
import { WorkingHoursEditorComponent } from './working-hours-editor/working-hours-editor.component';

@Component({
  selector: 'app-my-calendar',
  standalone: true,
  imports: [WorkingHoursEditorComponent],
  template: `
    <div class="page">
      <div class="page__head">
        <h1 class="page__title">Working hours</h1>
        <p class="page__sub">Control when clients can book time with you</p>
      </div>
      <app-working-hours-editor />
    </div>
  `,
  styles: [`
    .page { max-width: 680px; padding: 36px 40px; }
    .page__head { margin-bottom: 28px; }
    .page__title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 4px; letter-spacing: -0.02em; }
    .page__sub   { font-size: 13.5px; color: #475569; margin: 0; }
  `],
})
export class MyCalendarComponent {}

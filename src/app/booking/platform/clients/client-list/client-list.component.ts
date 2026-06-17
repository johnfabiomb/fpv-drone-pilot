import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookingDataService } from '@booking/core/services/booking-data.service';
import { ClientEditorComponent } from '@booking/ui/client-editor/client-editor.component';
import { Client } from '@booking/core/interfaces/booking.interface';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [DatePipe, ClientEditorComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent {
  readonly data = inject(BookingDataService);

  readonly editorOpen = signal(false);
  readonly editClient = signal<Client | null>(null);

  openNew(): void { this.editClient.set(null); this.editorOpen.set(true); }
  openEdit(c: Client): void { this.editClient.set(c); this.editorOpen.set(true); }
}

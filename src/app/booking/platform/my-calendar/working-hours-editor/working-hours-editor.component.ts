import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkingHoursService } from '@booking/core/services/working-hours.service';
import { WorkingHoursConfig, DayRule, TimeRange } from '@booking/core/interfaces/working-hours.interface';

interface DayForm { closed: boolean; ranges: TimeRange[]; }
interface OverrideEntry { date: string; rule: DayRule; }
interface OverrideForm { date: string; closed: boolean; ranges: TimeRange[]; }

const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ORDERED_DAYS = [1, 2, 3, 4, 5, 6, 0]; // Mon → Sun
const HOUR_OPTIONS = Array.from({ length: 25 }, (_, i) => i); // 0-24

function ruleToForm(rule: DayRule | undefined, fallback: DayRule): DayForm {
  const r = rule ?? fallback;
  if (r === 'closed') return { closed: true, ranges: [{ start: 7, end: 20 }] };
  return { closed: false, ranges: (r as TimeRange[]).map(rng => ({ ...rng })) };
}

function formToRule(f: DayForm): DayRule {
  return f.closed ? 'closed' : f.ranges.map(r => ({ start: r.start, end: r.end }));
}

@Component({
  selector: 'app-working-hours-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="whe">

      <!-- ── Day-of-week rules ── -->
      <section class="whe-section">
        <h3 class="whe-section__title">Weekly schedule</h3>
        <p class="whe-section__sub">Set one or more time windows per day. Multiple windows allow a break in the middle (e.g. 07:00–10:00 and 16:00–22:00).</p>

        <div class="whe-days">
          @for (dow of ORDERED_DAYS; track dow) {
            <div class="whe-day">
              <div class="whe-day__head">
                <span class="whe-day__name">{{ DAY_LABELS[dow] }}</span>
                <label class="whe-toggle">
                  <input type="checkbox" [(ngModel)]="dayForms[dow].closed" />
                  <span>Closed</span>
                </label>
              </div>

              @if (!dayForms[dow].closed) {
                <div class="whe-ranges">
                  @for (range of dayForms[dow].ranges; track $index; let i = $index) {
                    <div class="whe-range">
                      <select class="whe-select" [(ngModel)]="range.start">
                        @for (h of HOUR_OPTIONS; track h) {
                          <option [value]="h">{{ hourLabel(h) }}</option>
                        }
                      </select>
                      <span class="whe-range__sep">to</span>
                      <select class="whe-select" [(ngModel)]="range.end">
                        @for (h of HOUR_OPTIONS; track h) {
                          <option [value]="h">{{ hourLabel(h) }}</option>
                        }
                      </select>
                      @if (dayForms[dow].ranges.length > 1) {
                        <button class="whe-range__remove" type="button" (click)="removeRange(dow, i)" title="Remove">✕</button>
                      }
                    </div>
                  }
                  <button class="whe-add-range" type="button" (click)="addRange(dow)">+ Add window</button>
                </div>
              }
            </div>
          }
        </div>

        <div class="whe-footer">
          <button class="whe-btn whe-btn--primary" (click)="saveDays()" [disabled]="saving()">
            {{ saving() ? 'Saving…' : 'Save weekly schedule' }}
          </button>
          @if (savedMsg()) {
            <span class="whe-saved">{{ savedMsg() }}</span>
          }
        </div>
      </section>

      <!-- ── Date overrides ── -->
      <section class="whe-section">
        <h3 class="whe-section__title">Date overrides</h3>
        <p class="whe-section__sub">A specific date that differs from the weekly schedule — a day off, extended evening, special event, etc.</p>

        @if (overrides().length > 0) {
          <div class="whe-override-list">
            @for (o of overrides(); track o.date) {
              <div class="whe-override-row">
                <span class="whe-override-row__date">{{ o.date }}</span>
                <span class="whe-override-row__rule">{{ ruleLabel(o.rule) }}</span>
                <button class="whe-override-row__remove" type="button" (click)="removeOverride(o.date)">✕</button>
              </div>
            }
          </div>
        } @else {
          <p class="whe-empty">No overrides — all dates follow the weekly schedule.</p>
        }

        <!-- Add override form -->
        <div class="whe-override-form">
          <input class="whe-input" type="date" [(ngModel)]="newOverride.date" />
          <label class="whe-toggle">
            <input type="checkbox" [(ngModel)]="newOverride.closed" />
            <span>Day off</span>
          </label>

          @if (!newOverride.closed) {
            <div class="whe-ranges">
              @for (range of newOverride.ranges; track $index; let i = $index) {
                <div class="whe-range">
                  <select class="whe-select" [(ngModel)]="range.start">
                    @for (h of HOUR_OPTIONS; track h) {
                      <option [value]="h">{{ hourLabel(h) }}</option>
                    }
                  </select>
                  <span class="whe-range__sep">to</span>
                  <select class="whe-select" [(ngModel)]="range.end">
                    @for (h of HOUR_OPTIONS; track h) {
                      <option [value]="h">{{ hourLabel(h) }}</option>
                    }
                  </select>
                  @if (newOverride.ranges.length > 1) {
                    <button class="whe-range__remove" type="button" (click)="removeOverrideRange(i)">✕</button>
                  }
                </div>
              }
              <button class="whe-add-range" type="button" (click)="addOverrideRange()">+ Add window</button>
            </div>
          }

          <button class="whe-btn" (click)="addOverride()" [disabled]="!newOverride.date || saving()">Add override</button>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .whe { display: flex; flex-direction: column; }

    .whe-section {
      background: var(--color-bg);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      padding: 20px 24px;
      margin-bottom: 16px;

      &__title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--color-text-muted); margin: 0 0 4px; }
      &__sub   { font-size: 13px; color: var(--color-text-muted); margin: 0 0 16px; line-height: 1.5; }
    }

    .whe-days { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }

    .whe-day {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;

      &__head {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px 14px;
        background: var(--color-bg-light);
      }

      &__name { font-size: 14px; font-weight: 600; color: var(--color-text-base); }
    }

    .whe-toggle {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: var(--color-text-secondary); cursor: pointer;
    }

    .whe-ranges {
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .whe-range {
      display: flex; align-items: center; gap: 8px;

      &__sep { font-size: 13px; color: var(--color-text-muted); }

      &__remove {
        background: none; border: none; font-size: 13px;
        color: var(--color-text-muted); cursor: pointer; padding: 2px 4px;
        &:hover { color: #dc2626; }
      }
    }

    .whe-add-range {
      align-self: flex-start;
      background: none; border: 1px dashed var(--color-border);
      border-radius: var(--radius-sm); padding: 4px 10px;
      font-size: 12px; font-weight: 600; color: var(--color-text-muted);
      cursor: pointer; transition: all var(--transition);
      &:hover { border-color: var(--color-primary); color: var(--color-primary); }
    }

    .whe-select {
      padding: 6px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      font-size: 13px; color: var(--color-text-base); background: var(--color-bg);
      cursor: pointer; outline: none;
      &:focus { border-color: var(--color-primary); }
    }

    .whe-footer { display: flex; align-items: center; gap: 12px; }

    .whe-btn {
      padding: 8px 18px; border-radius: var(--radius-md); font-size: 13px; font-weight: 600;
      border: 1.5px solid var(--color-border); background: var(--color-bg);
      color: var(--color-text-secondary); cursor: pointer; transition: all var(--transition);
      &:hover:not(:disabled) { border-color: var(--color-primary); color: var(--color-primary); }
      &:disabled { opacity: .5; cursor: not-allowed; }
      &--primary { background: var(--color-primary); border-color: var(--color-primary); color: #000; &:hover:not(:disabled) { opacity: .9; color: #000; } }
    }

    .whe-saved { font-size: 13px; color: #16a34a; font-weight: 500; }

    .whe-override-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }

    .whe-override-row {
      display: flex; align-items: center; gap: 12px;
      padding: 8px 14px; background: var(--color-bg-light);
      border: 1px solid var(--color-border); border-radius: var(--radius-md);

      &__date { font-family: monospace; font-size: 13px; font-weight: 600; width: 100px; flex-shrink: 0; }
      &__rule { flex: 1; font-size: 13px; color: var(--color-text-secondary); }
      &__remove { background: none; border: none; font-size: 13px; cursor: pointer; color: var(--color-text-muted); padding: 2px 4px; &:hover { color: #dc2626; } }
    }

    .whe-empty { font-size: 13px; color: var(--color-text-muted); font-style: italic; margin: 0 0 16px; }

    .whe-override-form {
      display: flex; flex-direction: column; gap: 10px;
      padding: 14px;
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-md);
    }

    .whe-input {
      padding: 6px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      font-size: 13px; color: var(--color-text-base); background: var(--color-bg); outline: none;
      &:focus { border-color: var(--color-primary); }
    }
  `],
})
export class WorkingHoursEditorComponent implements OnInit {
  private svc = inject(WorkingHoursService);

  readonly ORDERED_DAYS = ORDERED_DAYS;
  readonly DAY_LABELS = DAY_LABELS;
  readonly HOUR_OPTIONS = HOUR_OPTIONS;

  // Indexed 0-6 (Sun-Sat) matching JS getDay()
  dayForms: DayForm[] = Array.from({ length: 7 }, () => ({ closed: false, ranges: [{ start: 7, end: 20 }] }));
  overrides = signal<OverrideEntry[]>([]);
  newOverride: OverrideForm = { date: '', closed: false, ranges: [{ start: 7, end: 20 }] };
  saving = signal(false);
  savedMsg = signal('');

  async ngOnInit(): Promise<void> {
    await this.svc.load();
    this.syncFromConfig();
  }

  private syncFromConfig(): void {
    const cfg = this.svc.config();
    for (let d = 0; d < 7; d++) {
      this.dayForms[d] = ruleToForm(cfg[d.toString() as keyof WorkingHoursConfig] as DayRule | undefined, cfg.default);
    }
    this.overrides.set(
      Object.entries(cfg.overrides ?? {})
        .map(([date, rule]) => ({ date, rule }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    );
  }

  hourLabel(h: number): string {
    return `${String(h).padStart(2, '0')}:00`;
  }

  ruleLabel(rule: DayRule): string {
    if (rule === 'closed') return 'Day off';
    return (rule as TimeRange[]).map(r => `${this.hourLabel(r.start)}–${this.hourLabel(r.end)}`).join('  ·  ');
  }

  // ── Day range management ──────────────────────────────────

  addRange(dow: number): void {
    const last = this.dayForms[dow].ranges.at(-1);
    const start = last ? Math.min(last.end, 23) : 9;
    this.dayForms[dow] = {
      ...this.dayForms[dow],
      ranges: [...this.dayForms[dow].ranges, { start, end: Math.min(start + 4, 24) }],
    };
  }

  removeRange(dow: number, idx: number): void {
    this.dayForms[dow] = {
      ...this.dayForms[dow],
      ranges: this.dayForms[dow].ranges.filter((_, i) => i !== idx),
    };
  }

  async saveDays(): Promise<void> {
    this.saving.set(true);
    const cfg = this.svc.config();
    const updated: WorkingHoursConfig = { ...cfg };
    for (let d = 0; d < 7; d++) {
      (updated as any)[d.toString()] = formToRule(this.dayForms[d]);
    }
    await this.svc.saveConfig(updated);
    this.saving.set(false);
    this.savedMsg.set('Saved ✓');
    setTimeout(() => this.savedMsg.set(''), 3000);
  }

  // ── Override range management ─────────────────────────────

  addOverrideRange(): void {
    const last = this.newOverride.ranges.at(-1);
    const start = last ? Math.min(last.end, 23) : 9;
    this.newOverride = {
      ...this.newOverride,
      ranges: [...this.newOverride.ranges, { start, end: Math.min(start + 4, 24) }],
    };
  }

  removeOverrideRange(idx: number): void {
    this.newOverride = {
      ...this.newOverride,
      ranges: this.newOverride.ranges.filter((_, i) => i !== idx),
    };
  }

  async addOverride(): Promise<void> {
    if (!this.newOverride.date) return;
    this.saving.set(true);
    await this.svc.addOverride(this.newOverride.date, formToRule(this.newOverride));
    this.syncFromConfig();
    this.newOverride = { date: '', closed: false, ranges: [{ start: 7, end: 20 }] };
    this.saving.set(false);
  }

  async removeOverride(date: string): Promise<void> {
    await this.svc.removeOverride(date);
    this.syncFromConfig();
  }
}

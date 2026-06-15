import { Injectable, signal } from '@angular/core';
import { bookingsDb as supabase } from '@booking/core/db/supabase.bookings';
import { DayRule, TimeRange, WorkingHoursConfig } from '@booking/core/interfaces/working-hours.interface';

const DEFAULT_CONFIG: WorkingHoursConfig = {
  default: [{ start: 7, end: 20 }],
};

@Injectable({ providedIn: 'root' })
export class WorkingHoursService {
  private _config = signal<WorkingHoursConfig>(DEFAULT_CONFIG);
  readonly config = this._config.asReadonly();

  private loaded = false;

  async load(): Promise<void> {
    if (this.loaded) return;
    this.loaded = true;
    const { data } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'working_hours')
      .single();
    if (data?.value) this._config.set(data.value as WorkingHoursConfig);
  }

  /** Returns all available slot start-hours for a given date (may be non-contiguous). */
  getSlotsForDate(date: Date): number[] {
    const config = this._config();
    const dateStr = toDateStr(date);
    const dow = date.getDay().toString() as keyof WorkingHoursConfig;

    const rule: DayRule =
      config.overrides?.[dateStr] ??
      (config[dow] as DayRule | undefined) ??
      config.default;

    if (rule === 'closed') return [];

    const slots: number[] = [];
    for (const range of rule as TimeRange[]) {
      for (let h = range.start; h < range.end; h++) slots.push(h);
    }
    return slots;
  }

  async saveConfig(config: WorkingHoursConfig): Promise<void> {
    await supabase
      .from('admin_settings')
      .upsert({ key: 'working_hours', value: config, updated_at: new Date().toISOString() });
    this._config.set({ ...config });
  }

  async addOverride(date: string, rule: DayRule): Promise<void> {
    const config = this._config();
    await this.saveConfig({ ...config, overrides: { ...config.overrides, [date]: rule } });
  }

  async removeOverride(date: string): Promise<void> {
    const config = this._config();
    const overrides = { ...config.overrides };
    delete overrides[date];
    await this.saveConfig({ ...config, overrides });
  }
}

function toDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

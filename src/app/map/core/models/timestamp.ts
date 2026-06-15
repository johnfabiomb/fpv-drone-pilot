/** Drop-in replacement for Firebase Timestamp. Supabase returns ISO date strings. */
export class Timestamp {
  private constructor(private readonly _date: Date) {}

  static fromDate(d: Date): Timestamp { return new Timestamp(new Date(d)); }
  static fromMillis(ms: number): Timestamp { return new Timestamp(new Date(ms)); }
  static fromISO(iso: string): Timestamp { return new Timestamp(new Date(iso)); }

  toDate(): Date { return new Date(this._date); }
  toMillis(): number { return this._date.getTime(); }
  get seconds(): number { return Math.floor(this._date.getTime() / 1000); }
  toJSON(): string { return this._date.toISOString(); }
  toISOString(): string { return this._date.toISOString(); }
}

import { bookingsDb } from '@booking/core/db/supabase.bookings';

export interface RealtimeHandle { destroy: () => void; }

/**
 * Subscribe to Postgres changes on one or more tables and run `onChange`
 * (debounced) whenever any of them change. RLS scopes events to the caller.
 * Returns a handle whose `destroy()` cleans up the channel + timer.
 *
 * Shared by the admin bookings list and the Work board so the realtime wiring
 * lives in exactly one place.
 */
export function subscribeToChanges(
  channelName: string,
  tables: string[],
  onChange: () => void,
  debounceMs = 400,
): RealtimeHandle {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debounced = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(onChange, debounceMs);
  };

  let channel = bookingsDb.channel(channelName);
  for (const table of tables) {
    channel = channel.on('postgres_changes', { event: '*', schema: 'public', table }, debounced);
  }
  channel.subscribe();

  return {
    destroy: () => {
      if (timer) clearTimeout(timer);
      bookingsDb.removeChannel(channel);
    },
  };
}

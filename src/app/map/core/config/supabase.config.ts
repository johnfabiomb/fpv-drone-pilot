import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://gaivtfmxcngjndadaelz.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_CpVgzpC5epAz-gDY-Pmnbw_M8oh2cxC';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    // Bypass the Web Locks API — prevents NavigatorLockAcquireTimeoutError in dev
    // and in browsers/tabs where the lock can't be acquired immediately.
    // This SPA is single-tab so the concurrency protection isn't needed.
    lock: <R>(_n: string, _t: number, fn: () => Promise<R>) => fn(),
  },
});

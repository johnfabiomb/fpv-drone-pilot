import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://gaivtfmxcngjndadaelz.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_CpVgzpC5epAz-gDY-Pmnbw_M8oh2cxC';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    lock: <R>(_n: string, _t: number, fn: () => Promise<R>) => fn(),
  },
});

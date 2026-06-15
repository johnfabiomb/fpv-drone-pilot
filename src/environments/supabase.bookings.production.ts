import { createClient } from '@supabase/supabase-js';

const URL = 'https://odmwjhysvvbhxytyefhv.supabase.co';
const KEY = 'sb_publishable_QgeLuNP9xUF1sqyo3N9AlQ_2qmV7E-3';

export const bookingsDb = createClient(URL, KEY, {
  auth: {
    lock: (_name, _acquireTimeout, fn) => fn(),
  },
});

import { createClient } from '@supabase/supabase-js';

const URL = 'https://odmwjhysvvbhxytyefhv.supabase.co';
const KEY = 'sb_publishable_QgeLuNP9xUF1sqyo3N9AlQ_2qmV7E-3';

// No-op lock: bypasses Navigator.locks to avoid NavigatorLockAcquireTimeoutError
// on hot-reload (dev) and prevents recursive deadlocks where getSession() holds
// the lock while a DB query also tries to auto-refresh the token via the same lock.
// Race safety: onAuthStateChange only handles SIGNED_IN/SIGNED_OUT, so
// TOKEN_REFRESHED never triggers a concurrent resolveRole call alongside getSession().
export const bookingsDb = createClient(URL, KEY, {
  auth: {
    lock: (_name, _acquireTimeout, fn) => fn(),
  },
});

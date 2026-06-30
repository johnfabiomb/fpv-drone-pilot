import {
  createClient
} from "./chunk-4746DPCT.js";

// src/app/map/core/config/supabase.config.ts
var SUPABASE_URL = "https://gaivtfmxcngjndadaelz.supabase.co";
var SUPABASE_KEY = "sb_publishable_CpVgzpC5epAz-gDY-Pmnbw_M8oh2cxC";
var supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    // Bypass the Web Locks API — prevents NavigatorLockAcquireTimeoutError in dev
    // and in browsers/tabs where the lock can't be acquired immediately.
    // This SPA is single-tab so the concurrency protection isn't needed.
    lock: (_n, _t, fn) => fn()
  }
});

export {
  supabase
};
//# sourceMappingURL=chunk-YDLK2X2B.js.map

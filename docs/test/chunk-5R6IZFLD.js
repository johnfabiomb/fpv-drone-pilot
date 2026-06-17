import {
  createClient
} from "./chunk-2VIPXXQC.js";

// src/app/booking/core/db/supabase.bookings.ts
var URL = "https://odmwjhysvvbhxytyefhv.supabase.co";
var KEY = "sb_publishable_QgeLuNP9xUF1sqyo3N9AlQ_2qmV7E-3";
var bookingsDb = createClient(URL, KEY, {
  auth: {
    lock: (_name, _acquireTimeout, fn) => fn()
  }
});

export {
  bookingsDb
};
//# sourceMappingURL=chunk-5R6IZFLD.js.map

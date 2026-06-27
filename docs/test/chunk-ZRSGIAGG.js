import {
  bookingsDb
} from "./chunk-3A2C4JCE.js";

// src/app/booking/core/utils/realtime.util.ts
function subscribeToChanges(channelName, tables, onChange, debounceMs = 400) {
  let timer = null;
  const debounced = () => {
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(onChange, debounceMs);
  };
  let channel = bookingsDb.channel(channelName);
  for (const table of tables) {
    channel = channel.on("postgres_changes", { event: "*", schema: "public", table }, debounced);
  }
  channel.subscribe();
  return {
    destroy: () => {
      if (timer)
        clearTimeout(timer);
      bookingsDb.removeChannel(channel);
    }
  };
}

export {
  subscribeToChanges
};
//# sourceMappingURL=chunk-ZRSGIAGG.js.map

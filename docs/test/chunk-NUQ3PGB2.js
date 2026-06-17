// src/app/booking/core/utils/currency.util.ts
var SYMBOLS = { EUR: "\u20AC", USD: "$", GBP: "\xA3" };
function currencySymbol(code) {
  if (!code)
    return "\u20AC";
  return SYMBOLS[code] ?? code;
}

export {
  currencySymbol
};
//# sourceMappingURL=chunk-NUQ3PGB2.js.map

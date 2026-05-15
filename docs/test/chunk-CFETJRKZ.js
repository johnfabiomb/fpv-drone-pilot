import {
  SeoService
} from "./chunk-25R47I5C.js";
import {
  ActivatedRoute
} from "./chunk-GXMQ7NKC.js";
import {
  CommonModule,
  DatePipe,
  isPlatformBrowser
} from "./chunk-QICNAPY4.js";
import {
  PLATFORM_ID,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FZOYICSM.js";
import {
  __async
} from "./chunk-TXDUYLVM.js";

// src/app/platform/payment-success/payment-success.component.ts
var _c0 = ["calendarBtn"];
var CALENDAR_URL = "https://calendar.google.com/calendar/appointments/AcZssZ2YqYJ4FmNaa5k6pvktkeql6hrT6x6Gf4xX6Wk=?gv=true";
var PaymentSuccessComponent = class _PaymentSuccessComponent {
  constructor(route, seo) {
    this.route = route;
    this.seo = seo;
    this.sessionId = null;
    this.paidAt = /* @__PURE__ */ new Date();
    this.sharing = false;
    this.copied = false;
    this.platformId = inject(PLATFORM_ID);
  }
  ngAfterViewInit() {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const link = document.createElement("link");
      link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      yield this.loadScript("https://calendar.google.com/calendar/scheduling-button-script.js");
      window.calendar?.schedulingButton.load({
        url: CALENDAR_URL,
        color: "#F4A922",
        label: "Book your slot",
        target: this.calendarBtnRef.nativeElement
      });
    });
  }
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
  ngOnInit() {
    this.seo.setPage("pay-success");
    this.sessionId = this.route.snapshot.queryParamMap.get("session_id");
  }
  copyRef() {
    return __async(this, null, function* () {
      if (!this.sessionId)
        return;
      const clipboardWrite = navigator.clipboard && typeof navigator.clipboard.writeText === "function";
      if (!clipboardWrite) {
        try {
          const el = document.createElement("input");
          el.value = this.sessionId;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          this.copied = true;
          setTimeout(() => this.copied = false, 2e3);
        } catch {
        }
        return;
      }
      try {
        yield navigator.clipboard.writeText(this.sessionId);
        this.copied = true;
        setTimeout(() => this.copied = false, 2e3);
      } catch {
      }
    });
  }
  shareConfirmation() {
    return __async(this, null, function* () {
      this.sharing = true;
      try {
        const canvas = this.buildReceiptCanvas();
        const blob = yield new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(new Error("Canvas error")), "image/png"));
        const file = new File([blob], "payment-confirmation.png", { type: "image/png" });
        if (navigator.canShare?.({ files: [file] })) {
          yield navigator.share({ files: [file], title: "Payment Confirmed \u2014 @Johnfabiomb" });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "payment-confirmation.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      } catch {
      } finally {
        this.sharing = false;
      }
    });
  }
  buildReceiptCanvas() {
    const W = 540;
    const H = 620;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const canvas = document.createElement("canvas");
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#f6f7f9";
    ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 300);
    glow.addColorStop(0, "rgba(244,169,34,0.10)");
    glow.addColorStop(1, "rgba(244,169,34,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    const CX = W / 2;
    ctx.beginPath();
    ctx.arc(CX, 100, 38, 0, Math.PI * 2);
    ctx.strokeStyle = "#F4A922";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = "700 18px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#F4A922";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JM", CX, 100);
    ctx.textBaseline = "alphabetic";
    ctx.font = "800 26px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#111827";
    ctx.fillText("Payment Confirmed!", CX, 178);
    ctx.font = "400 14px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText("@Johnfabiomb", CX, 204);
    ctx.font = "400 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("FPV DRONE PILOT \xB7 CONTENT CREATOR", CX, 226);
    ctx.beginPath();
    ctx.moveTo(CX - 50, 248);
    ctx.lineTo(CX + 50, 248);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.stroke();
    const cX = 40, cY = 266, cW = W - 80, cH = 236, cR = 16;
    ctx.beginPath();
    ctx.moveTo(cX + cR, cY);
    ctx.lineTo(cX + cW - cR, cY);
    ctx.quadraticCurveTo(cX + cW, cY, cX + cW, cY + cR);
    ctx.lineTo(cX + cW, cY + cH - cR);
    ctx.quadraticCurveTo(cX + cW, cY + cH, cX + cW - cR, cY + cH);
    ctx.lineTo(cX + cR, cY + cH);
    ctx.quadraticCurveTo(cX, cY + cH, cX, cY + cH - cR);
    ctx.lineTo(cX, cY + cR);
    ctx.quadraticCurveTo(cX, cY, cX + cR, cY);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.stroke();
    const pad = 24;
    const lx = cX + pad;
    const rx = cX + cW - pad;
    const r1y = cY + 48;
    ctx.font = "400 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "left";
    ctx.fillText("Status", lx, r1y);
    ctx.beginPath();
    ctx.arc(rx - 44, r1y - 4.5, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#4ade80";
    ctx.fill();
    ctx.font = "600 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#4ade80";
    ctx.textAlign = "right";
    ctx.fillText("Paid", rx, r1y);
    const d1y = cY + 74;
    ctx.beginPath();
    ctx.moveTo(lx, d1y);
    ctx.lineTo(rx, d1y);
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    ctx.stroke();
    const r2y = d1y + 42;
    ctx.font = "400 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "left";
    ctx.fillText("Date", lx, r2y);
    ctx.fillStyle = "#374151";
    ctx.textAlign = "right";
    ctx.fillText(this.formatCanvasDate(this.paidAt), rx, r2y);
    const d2y = d1y + 68;
    ctx.beginPath();
    ctx.moveTo(lx, d2y);
    ctx.lineTo(rx, d2y);
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    ctx.stroke();
    const r3y = d2y + 36;
    ctx.font = "400 13px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "left";
    ctx.fillText("Reference", lx, r3y);
    const ref = this.sessionId ?? "\u2014";
    ctx.font = "400 10px monospace";
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "right";
    const line1 = ref.substring(0, 28);
    const line2 = ref.length > 28 ? ref.substring(28, 54) + (ref.length > 54 ? "\u2026" : "") : "";
    ctx.fillText(line1, rx, r3y);
    if (line2)
      ctx.fillText(line2, rx, r3y + 16);
    ctx.font = "400 11px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "center";
    ctx.fillText("johnfabiomb.com", CX, cY + cH + 46);
    return canvas;
  }
  formatCanvasDate(d) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} \xB7 ${h}:${m}`;
  }
  static {
    this.\u0275fac = function PaymentSuccessComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaymentSuccessComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(SeoService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentSuccessComponent, selectors: [["app-payment-success"]], viewQuery: function PaymentSuccessComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.calendarBtnRef = _t.first);
      }
    }, decls: 51, vars: 8, consts: [["calendarBtn", ""], [1, "success-page"], [1, "success-inner"], [1, "check-wrap"], ["viewBox", "0 0 52 52", "fill", "none", 1, "check-icon"], ["cx", "26", "cy", "26", "r", "25", "stroke", "#F4A922", "stroke-width", "2", 1, "check-circle"], ["d", "M14 26l9 9 15-17", "stroke", "#F4A922", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "check-mark"], [1, "success-title"], [1, "success-sub"], [1, "receipt-card"], [1, "receipt-row"], [1, "receipt-label"], [1, "status-badge"], [1, "status-dot"], [1, "receipt-divider"], [1, "receipt-value"], ["title", "Tap to copy", 1, "receipt-row", "receipt-row--ref", 3, "click"], [1, "ref-copy"], [1, "receipt-ref"], [1, "copy-hint"], [1, "calendar-wrap"], [1, "divider-or"], [1, "share-btn", 3, "click", "disabled"], ["width", "19", "height", "19", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "18", "cy", "5", "r", "3"], ["cx", "6", "cy", "12", "r", "3"], ["cx", "18", "cy", "19", "r", "3"], ["x1", "8.59", "y1", "13.51", "x2", "15.42", "y2", "17.49"], ["x1", "15.41", "y1", "6.51", "x2", "8.59", "y2", "10.49"], ["href", "/pay", 1, "back-link"]], template: function PaymentSuccessComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 4);
        \u0275\u0275element(4, "circle", 5)(5, "path", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "h1", 7);
        \u0275\u0275text(7, "Payment received!");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 8);
        \u0275\u0275text(9, " Share your confirmation and book your slot");
        \u0275\u0275element(10, "br");
        \u0275\u0275text(11, "to complete the process. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 9)(13, "div", 10)(14, "span", 11);
        \u0275\u0275text(15, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 12);
        \u0275\u0275element(17, "span", 13);
        \u0275\u0275text(18, " Paid ");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(19, "div", 14);
        \u0275\u0275elementStart(20, "div", 10)(21, "span", 11);
        \u0275\u0275text(22, "Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span", 15);
        \u0275\u0275text(24);
        \u0275\u0275pipe(25, "date");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(26, "div", 14);
        \u0275\u0275elementStart(27, "div", 16);
        \u0275\u0275listener("click", function PaymentSuccessComponent_Template_div_click_27_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.copyRef());
        });
        \u0275\u0275elementStart(28, "span", 11);
        \u0275\u0275text(29, "Reference");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div", 17)(31, "span", 18);
        \u0275\u0275text(32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "span", 19);
        \u0275\u0275text(34);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(35, "div", 20);
        \u0275\u0275element(36, "div", null, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 21)(39, "span");
        \u0275\u0275text(40, "also share your confirmation");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "button", 22);
        \u0275\u0275listener("click", function PaymentSuccessComponent_Template_button_click_41_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.shareConfirmation());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(42, "svg", 23);
        \u0275\u0275element(43, "circle", 24)(44, "circle", 25)(45, "circle", 26)(46, "line", 27)(47, "line", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275text(48);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(49, "a", 29);
        \u0275\u0275text(50, "\u2190 Back to payment page");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275advance(24);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 5, ctx.paidAt, "d MMM y \xB7 HH:mm"));
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate((tmp_2_0 = ctx.sessionId) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "\u2014");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.copied ? "\u2713 Copied" : "tap to copy");
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", ctx.sharing);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.sharing ? "Preparing\u2026" : "Share confirmation", " ");
      }
    }, dependencies: [CommonModule, DatePipe], styles: ['\n\n.success-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  background: #f6f7f9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 56px 24px 48px;\n}\n.success-inner[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.check-wrap[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.check-icon[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n}\n.check-circle[_ngcontent-%COMP%] {\n  stroke-dasharray: 160;\n  stroke-dashoffset: 160;\n  animation: _ngcontent-%COMP%_draw-circle 0.6s ease forwards;\n}\n.check-mark[_ngcontent-%COMP%] {\n  stroke-dasharray: 40;\n  stroke-dashoffset: 40;\n  animation: _ngcontent-%COMP%_draw-check 0.4s ease 0.55s forwards;\n}\n@keyframes _ngcontent-%COMP%_draw-circle {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_draw-check {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n.success-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 800;\n  color: #111827;\n  letter-spacing: -0.5px;\n  margin: 0 0 12px;\n}\n.success-sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  line-height: 1.7;\n  margin: 0 0 32px;\n}\n.receipt-card[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 16px;\n  padding: 8px 24px;\n  margin-bottom: 24px;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n}\n.receipt-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 0;\n  gap: 16px;\n}\n.receipt-row--ref[_ngcontent-%COMP%] {\n  align-items: flex-start;\n}\n.receipt-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #f3f4f6;\n}\n.receipt-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #9ca3af;\n  flex-shrink: 0;\n}\n.receipt-value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #374151;\n  font-weight: 600;\n  text-align: right;\n}\n.receipt-ref[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6b7280;\n  word-break: break-all;\n  text-align: right;\n  font-family: monospace;\n  letter-spacing: 0.3px;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #16a34a;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #16a34a;\n  box-shadow: 0 0 6px rgba(22, 163, 74, 0.4);\n}\n.share-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 16px 24px;\n  background: #fff;\n  color: #F4A922;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 14px;\n  font-size: 16px;\n  font-weight: 700;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin-bottom: 16px;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    transform 0.12s;\n  letter-spacing: -0.2px;\n}\n.share-btn[_ngcontent-%COMP%]:hover {\n  border-color: #F4A922;\n  box-shadow: 0 2px 12px rgba(244, 169, 34, 0.12);\n}\n.share-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.share-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.ref-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 3px;\n  cursor: pointer;\n}\n.copy-hint[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #9ca3af;\n  letter-spacing: 0.3px;\n}\n.receipt-row--ref[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.receipt-row--ref[_ngcontent-%COMP%]:active {\n  opacity: 0.7;\n}\n.divider-or[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 8px 0;\n}\n.divider-or[_ngcontent-%COMP%]::before, \n.divider-or[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #e5e7eb;\n}\n.divider-or[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n  letter-spacing: 0.3px;\n}\n.calendar-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 24px;\n}\n.calendar-wrap[_ngcontent-%COMP%]     button {\n  width: 100% !important;\n  padding: 18px 24px !important;\n  background: #F4A922 !important;\n  color: #000 !important;\n  border: none !important;\n  border-radius: 14px !important;\n  font-size: 17px !important;\n  font-weight: 700 !important;\n  font-family: inherit !important;\n  letter-spacing: -0.2px !important;\n  cursor: pointer !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  gap: 10px !important;\n  box-shadow: none !important;\n  transition: opacity 0.2s, transform 0.15s !important;\n}\n.calendar-wrap[_ngcontent-%COMP%]     button:hover {\n  opacity: 0.9 !important;\n}\n.calendar-wrap[_ngcontent-%COMP%]     button:active {\n  transform: scale(0.98) !important;\n  opacity: 0.85 !important;\n}\n.calendar-wrap[_ngcontent-%COMP%]     button img, \n.calendar-wrap[_ngcontent-%COMP%]     button svg {\n  display: none !important;\n}\n.back-link[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  text-decoration: none;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: #F4A922;\n}\n/*# sourceMappingURL=payment-success.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentSuccessComponent, { className: "PaymentSuccessComponent", filePath: "src/app/platform/payment-success/payment-success.component.ts", lineNumber: 15 });
})();
export {
  PaymentSuccessComponent
};
//# sourceMappingURL=chunk-CFETJRKZ.js.map

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

const CALENDAR_URL = 'https://calendar.google.com/calendar/appointments/AcZssZ2YqYJ4FmNaa5k6pvktkeql6hrT6x6Gf4xX6Wk=?gv=true';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit, AfterViewInit {
  @ViewChild('calendarBtn') calendarBtnRef!: ElementRef;

  sessionId: string | null = null;
  paidAt = new Date();
  sharing = false;
  copied = false;

  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  async ngAfterViewInit(): Promise<void> {
    const link = document.createElement('link');
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    await this.loadScript('https://calendar.google.com/calendar/scheduling-button-script.js');

    (window as any).calendar?.schedulingButton.load({
      url: CALENDAR_URL,
      color: '#F4A922',
      label: 'Book your slot',
      target: this.calendarBtnRef.nativeElement,
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  ngOnInit() {
    this.seo.setPage('pay-success');
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
  }

  async copyRef(): Promise<void> {
    if (!this.sessionId) return;
    try {
      await navigator.clipboard.writeText(this.sessionId);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch {
      // clipboard not available
    }
  }

  async shareConfirmation(): Promise<void> {
    this.sharing = true;
    try {
      const canvas = this.buildReceiptCanvas();
      const blob = await new Promise<Blob>((res, rej) =>
        canvas.toBlob(b => b ? res(b) : rej(new Error('Canvas error')), 'image/png')
      );
      const file = new File([blob], 'payment-confirmation.png', { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Payment Confirmed — @Johnfabiomb' });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payment-confirmation.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // user cancelled or unsupported
    } finally {
      this.sharing = false;
    }
  }

  private buildReceiptCanvas(): HTMLCanvasElement {
    const W = 540;
    const H = 620;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const canvas = document.createElement('canvas');
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    // ── Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    // ── Gold radial glow at top
    const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 360);
    glow.addColorStop(0, 'rgba(244,169,34,0.22)');
    glow.addColorStop(1, 'rgba(244,169,34,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // ── JM monogram circle
    const CX = W / 2;
    ctx.beginPath();
    ctx.arc(CX, 100, 38, 0, Math.PI * 2);
    ctx.strokeStyle = '#F4A922';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = '700 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#F4A922';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('JM', CX, 100);
    ctx.textBaseline = 'alphabetic';

    // ── Payment Confirmed
    ctx.font = '800 26px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Payment Confirmed!', CX, 178);

    // ── @Johnfabiomb
    ctx.font = '400 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('@Johnfabiomb', CX, 204);

    // ── Subtitle
    ctx.font = '400 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('FPV DRONE PILOT · CONTENT CREATOR', CX, 226);

    // ── Short divider
    ctx.beginPath();
    ctx.moveTo(CX - 50, 248);
    ctx.lineTo(CX + 50, 248);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Receipt card
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
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const pad = 24;
    const lx = cX + pad;
    const rx = cX + cW - pad;

    // ── Row 1: Status
    const r1y = cY + 48;
    ctx.font = '400 13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'left';
    ctx.fillText('Status', lx, r1y);
    ctx.beginPath();
    ctx.arc(rx - 44, r1y - 4.5, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#4ade80';
    ctx.fill();
    ctx.font = '600 13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#4ade80';
    ctx.textAlign = 'right';
    ctx.fillText('Paid', rx, r1y);

    // ── Divider 1
    const d1y = cY + 74;
    ctx.beginPath();
    ctx.moveTo(lx, d1y);
    ctx.lineTo(rx, d1y);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Row 2: Date
    const r2y = d1y + 42;
    ctx.font = '400 13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'left';
    ctx.fillText('Date', lx, r2y);
    ctx.fillStyle = '#d1d5db';
    ctx.textAlign = 'right';
    ctx.fillText(this.formatCanvasDate(this.paidAt), rx, r2y);

    // ── Divider 2
    const d2y = d1y + 68;
    ctx.beginPath();
    ctx.moveTo(lx, d2y);
    ctx.lineTo(rx, d2y);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Row 3: Reference
    const r3y = d2y + 36;
    ctx.font = '400 13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'left';
    ctx.fillText('Reference', lx, r3y);

    const ref = this.sessionId ?? '—';
    ctx.font = '400 10px monospace';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'right';
    const line1 = ref.substring(0, 28);
    const line2 = ref.length > 28 ? ref.substring(28, 54) + (ref.length > 54 ? '…' : '') : '';
    ctx.fillText(line1, rx, r3y);
    if (line2) ctx.fillText(line2, rx, r3y + 16);

    // ── Bottom branding
    ctx.font = '400 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center';
    ctx.fillText('johnfabiomb.com', CX, cY + cH + 46);

    return canvas;
  }

  private formatCanvasDate(d: Date): string {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${h}:${m}`;
  }
}

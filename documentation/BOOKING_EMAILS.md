# Booking Platform — Email / Notifications (spec, not yet built)

The system currently sends **no transactional emails** (only Supabase's magic-link sign-in).
This is the highest-impact missing piece. This doc is the plan so it can be built cleanly.

## Recommended approach
- **Provider:** [Resend](https://resend.com) (simple API, generous free tier) — or any SMTP via Supabase.
- **Where:** a single `send-email` Edge Function (service-role), called from the booking
  lifecycle (webhook, approve, create-booking-request) — never from the browser.
- **Per-org:** sender name/reply-to come from the **organization** (e.g. "John F. Montaño
  <bookings@…>"). Store an optional `organizations.email_from` / reply-to.
- **Secrets:** `RESEND_API_KEY` in Supabase Edge Function secrets.

## Emails to send

### To the customer
| Trigger | Email |
|---|---|
| Card payment succeeds (`stripe-webhook`) | **Booking confirmed** + **receipt** (ref, service, worker, date/time, amount paid, balance due, add-to-calendar .ics) |
| Cash request created (`create_booking_request`) | **Request received** — "we'll confirm shortly" |
| Admin approves cash request (`approve-cash-booking`) | **Booking confirmed** (+ how/when to pay) |
| Admin declines / cancels | **Booking declined / cancelled** (+ refund note if refunded) |
| Balance still due | **Pay the balance** (link to `/book/:token`) |
| 24h before the shoot | **Reminder** (needs a scheduled job / cron) |

### To the org (owner/admin + relevant worker)
| Trigger | Email |
|---|---|
| New cash request | **New request to approve** (client, service, time, amount) |
| New card booking confirmed | **New booking** (so you don't rely on the live panel) |
| Cancellation | **Booking cancelled** |

## Building blocks needed
- `send-email` Edge Function (Resend) with simple HTML templates per type.
- Call sites: `stripe-webhook` (confirmed + receipt + owner alert), `approve-cash-booking`
  (confirmed), `create_booking_request` path (request received + owner alert — needs an Edge
  Function wrapper or DB webhook since the RPC can't send email), `cancel-booking` (cancelled/refunded).
- A **reminder** job: a scheduled Edge Function (Supabase cron) that emails bookings ~24h out.
- `.ics` attachment generator for "add to calendar".

## Notes
- Keep templates minimal + on-brand (cream/gold, like the quotation).
- Idempotency: don't double-send (e.g. webhook retries) — guard on a `notified_at` flag or event id.
- The customer's email is on `clients.email`; the org's from-address on `organizations`.

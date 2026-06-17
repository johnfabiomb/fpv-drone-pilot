const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3';

async function getAccessToken(): Promise<string> {
  const res = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: Deno.env.get('GOOGLE_OAUTH_CLIENT_ID')!,
      client_secret: Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET')!,
      refresh_token: Deno.env.get('GOOGLE_OAUTH_REFRESH_TOKEN')!,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`OAuth token refresh failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

export async function checkSlotAvailability(
  startAt: string,
  endAt: string,
  excludeEventId?: string,
): Promise<boolean> {
  const token = await getAccessToken();
  const calId = encodeURIComponent(Deno.env.get('GOOGLE_CALENDAR_ID')!);
  const url = `${CALENDAR_BASE}/calendars/${calId}/events?timeMin=${encodeURIComponent(startAt)}&timeMax=${encodeURIComponent(endAt)}&singleEvents=true`;

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  const events: Array<{ id: string; status: string }> = data.items ?? [];

  const blocking = events.filter(e => e.status !== 'cancelled' && e.id !== excludeEventId);
  return blocking.length === 0;
}

export async function createCalendarEvent(params: {
  title: string;
  description?: string | null;
  location?: string | null;
  startAt: string;
  endAt: string;
  bookingRef: string;
}): Promise<string> {
  const token = await getAccessToken();
  const calId = encodeURIComponent(Deno.env.get('GOOGLE_CALENDAR_ID')!);

  const body = {
    summary: `${params.title} [${params.bookingRef}]`,
    description: params.description ?? undefined,
    location: params.location ?? undefined,
    start: { dateTime: params.startAt },
    end: { dateTime: params.endAt },
  };

  const res = await fetch(`${CALENDAR_BASE}/calendars/${calId}/events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!data.id) throw new Error(`GCal event creation failed: ${JSON.stringify(data)}`);
  return data.id;
}

export async function updateCalendarEvent(
  eventId: string,
  fields: { summary?: string; description?: string; location?: string | null; startAt?: string; endAt?: string },
): Promise<void> {
  const token = await getAccessToken();
  const calId = encodeURIComponent(Deno.env.get('GOOGLE_CALENDAR_ID')!);
  // PATCH only the keys provided; nest start/end as Google expects.
  const body: Record<string, unknown> = {};
  if (fields.summary !== undefined) body.summary = fields.summary;
  if (fields.description !== undefined) body.description = fields.description;
  if (fields.location !== undefined) body.location = fields.location ?? undefined;
  if (fields.startAt) body.start = { dateTime: fields.startAt };
  if (fields.endAt) body.end = { dateTime: fields.endAt };
  const res = await fetch(`${CALENDAR_BASE}/calendars/${calId}/events/${eventId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GCal update failed (${res.status}): ${await res.text()}`);
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const token = await getAccessToken();
  const calId = encodeURIComponent(Deno.env.get('GOOGLE_CALENDAR_ID')!);
  const res = await fetch(`${CALENDAR_BASE}/calendars/${calId}/events/${eventId}`, {
    method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
  });
  // 204 = deleted. 404/410 = the event is already gone — treat as success so the
  // caller can safely forget the id. Anything else is a real failure: throw so the
  // caller keeps the id and can retry instead of orphaning the event on the calendar.
  if (!res.ok && res.status !== 404 && res.status !== 410) {
    throw new Error(`GCal delete failed (${res.status}): ${await res.text()}`);
  }
}

export async function listEvents(timeMin: string, timeMax: string): Promise<unknown[]> {
  const token = await getAccessToken();
  const calId = encodeURIComponent(Deno.env.get('GOOGLE_CALENDAR_ID')!);
  const url = `${CALENDAR_BASE}/calendars/${calId}/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&maxResults=250`;

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  return data.items ?? [];
}

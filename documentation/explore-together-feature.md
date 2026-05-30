# Explore Together — Hiking Groups Feature

## What This Is

A social feature that lets logged-in users create and join hiking groups for specific Malta spots. Anyone can browse groups; signing in unlocks joining, seeing the member list, and chatting.

---

## Firebase Cost

**Chat is NOT a cost concern at this scale.**

| Scenario | Reads/month | Cost/month |
|---|---|---|
| 50 groups, 8 members, 30 msgs/day | 360,000 | ~$0.22 |
| 200 active groups | ~1.4M | ~$0.86 |
| 1,000 groups | ~7M | ~$4.32 |

Rules that keep costs low forever:
- Text-only messages — no file/image uploads
- Last **100 messages** per group (`limit(100)` Firestore query)
- **No real-time presence** — "last active" timestamp updated on app open + tab focus, shown as "Active today / this week / Inactive"

---

## Routes

Both are children of `MapShellComponent` (persistent map). Feature-flagged behind `FEATURES.GROUPS`.

```
/malta/groups        → ExploreTogetherComponent   (group list)
/malta/groups/:id    → GroupDetailComponent        (detail + chat)
```

---

## Visibility Rules

| Content | Guest | Logged in |
|---|---|---|
| Group list (cards with leader, date, avatars) | ✅ visible | ✅ visible |
| Group detail (title, date, description) | ✅ visible | ✅ visible |
| Member list | 🔒 sign-in gate | ✅ visible |
| Chat | 🔒 sign-in gate | ✅ visible |
| Join / Leave button | 🔒 sign-in gate | ✅ visible |

Sign-in gate shows: _"Sign in to see who's joining and chat with the group"_ + primary sign-in button.

---

## Firestore Data Model

```
groups/{groupId}
  title:          string
  spotSlug:       string          ← links to locations.json slug
  spotTitle:      string
  spotLat:        number
  spotLon:        number
  date:           Timestamp
  time:           string          e.g. "07:30"
  description:    string
  difficulty:     'easy' | 'moderate' | 'hard'
  maxMembers:     number | null   ← null = unlimited
  status:         'open' | 'full' | 'cancelled' | 'completed'
  leaderId:       string
  leaderName:     string
  leaderPhoto:    string
  memberCount:    number          ← denormalized for fast list display
  memberPreviews: [{uid, displayName, photoURL}]  ← first 5, for avatar bubbles
  createdAt:      Timestamp
  updatedAt:      Timestamp

groups/{groupId}/members/{userId}
  uid:            string
  displayName:    string
  photoURL:       string
  role:           'leader' | 'member'
  joinedAt:       Timestamp
  lastActive:     Timestamp       ← updated on app open + visibilitychange

groups/{groupId}/messages/{msgId}
  uid:            string
  displayName:    string
  photoURL:       string
  text:           string          ← max 500 chars, enforced by Firestore rules
  createdAt:      Timestamp       ← immutable; no edit/delete
```

---

## Files to Create

| File | Purpose |
|---|---|
| `src/app/shared/models/group.model.ts` | All types: `Group`, `GroupMember`, `GroupMessage`, `GroupMemberPreview`, `GroupStatus`, `GroupRole`, `CreateGroupPayload`, `GroupFullError`, `LeaderMustTransferError` |
| `src/app/shared/services/groups.service.ts` | All Firestore operations — listeners, mutations, presence |
| `src/app/components/group-card/group-card.component.ts` | Single-file card component for list view |
| `src/app/components/member-avatars/member-avatars.component.ts` | Overlapping circular avatar bubbles + "+N" count |
| `src/app/platform/explore-together/explore-together.component.ts` | Group list page + inline create form |
| `src/app/platform/group-detail/group-detail.component.ts` | Group detail + member list + chat |

---

## Files to Modify

| File | Change |
|---|---|
| `src/app/app.routes.ts` | Add `groups` + `groups/:id` as children of MapShellComponent |
| `src/app/feature-flags.ts` | `GROUPS: true` (dev) |
| `src/environments/feature-flags.staging.ts` | `GROUPS: true` |
| `src/environments/feature-flags.production.ts` | `GROUPS: false` (off until approved) |
| `src/app/components/footer/footer.component.html` | Add `👥 Groups` nav button (feature-flagged) |
| `src/app/components/footer/footer.component.scss` | `.groups-btn` — same style as `.list-btn` |
| `src/app/shared/services/navigation.service.ts` | Add `'groups'` to `back()` so back button on detail works |
| `src/app/shared/services/seo.service.ts` | Add `'groups'` page entry |
| `src/app/platform/location-detail/location-detail.component.*` | "Who's exploring here?" widget — one-shot `fetchGroupsForSpot(slug)` |
| `prerender-routes.txt` + `sitemap.xml` | Add `/malta/groups` when flag flips to production |

---

## GroupsService API

```typescript
// Public signals
groups:         Signal<Group[]>
loading:        Signal<boolean>
detailGroup:    Signal<Group | null>
detailMembers:  Signal<GroupMember[]>
messages:       Signal<GroupMessage[]>

// Computed
openGroups:            computed() → status open/full & date >= today
groupsAsProviderPins:  computed() → Provider[] projection for map layer pins

// Listeners — called by components in ngOnInit / ngOnDestroy
startGroupsListener(): void
stopGroupsListener():  void
startDetailListener(id: string): void
stopDetailListener():  void

// Mutations
createGroup(data: CreateGroupPayload): Promise<string>   // returns groupId
joinGroup(groupId: string): Promise<void>                // runTransaction — race-safe
leaveGroup(groupId: string): Promise<void>               // throws LeaderMustTransferError if leader + others present
assignLeader(groupId, targetUid): Promise<void>          // writeBatch (3 writes atomic)
transferOwnership(groupId, targetUid): Promise<void>     // writeBatch + updates leaderName/Photo
cancelGroup(groupId: string): Promise<void>              // sets status = 'cancelled'
sendMessage(groupId, text): Promise<void>
updateLastActive(groupId: string): Promise<void>         // silent, never throws

// Utilities
static formatLastActive(ts): 'Active today' | 'Active this week' | 'Inactive'
fetchGroupsForSpot(slug): Promise<void>                  // one-shot getDocs for location detail widget
```

---

## Map Integration

`GroupsService.groupsAsProviderPins` maps `Group[]` → `Provider[]` (minimum shape the map reads):

```typescript
{
  id:        group.id,
  name:      group.title,
  tagline:   `${group.memberCount} explorers`,
  emoji:     '👥',
  category:  'group',
  lat:       group.spotLat,
  lon:       group.spotLon,
  showOnMap: true,
  mapLabel:  '👥 Group',
}
```

`ExploreTogetherComponent` uses an `effect()` to keep `bridge.providerPins` in sync:

```typescript
effect(() => this.bridge.providerPins.set(this.groupsService.groupsAsProviderPins()));
```

On `bridge.providerPinSelected$`, check `provider.category === 'group'` to navigate to `/malta/groups/:id`.

---

## Race Condition Handling

| Scenario | Solution |
|---|---|
| Two users join the last slot simultaneously | `joinGroup` uses `runTransaction` — reads memberCount + maxMembers atomically, throws `GroupFullError` if full |
| Leader transfers + someone else promotes simultaneously | `assignLeader`/`transferOwnership` use `writeBatch` — Firestore rules require `leaderId === request.auth.uid` so only the actual current leader can succeed |
| Leaving as the only member | `leaveGroup` deletes group doc + member doc in a `writeBatch` |
| Leaving as leader with other members | Throws `LeaderMustTransferError` — UI shows transfer flow before allowing leave |
| Duplicate listeners on re-navigation | Every `start*()` calls the corresponding `stop*()` first |

---

## Firestore Security Rules (summary)

```
groups/{id}
  read:   public (anyone)
  create: auth required; leaderId = self; status = 'open'; memberCount = 1
  update: leader only; status must stay in valid set
  delete: leader only

groups/{id}/members/{uid}
  read:   auth required
  create: self only; role must be 'member'
  update: self (lastActive etc.) OR leader changing role field only
  delete: self OR leader

groups/{id}/messages/{msgId}
  read:   auth required
  create: auth required; uid = self; text ≤ 500 chars; user must exist in members subcollection
  update: never
  delete: never
```

---

## Group Card Layout

```
┌──────────────────────────────────────┐
│ [Leader 32px]   Blue Grotto Sunrise  │
│                 Sat 1 Jun · 07:30    │
│ ● easy          John M. leading      │
│ [JM][AI][PF]+2  ·  5 / 10 spots     │
└──────────────────────────────────────┘
```

**MemberAvatars**: 28px circles, `margin-left: -8px` from second onwards, z-index steps right-to-left, "+N" grey bubble when total > 5.

---

## Implementation Sequence

1. `group.model.ts` — types + error classes
2. `groups.service.ts` — Firestore service
3. `group-card.component.ts` — card UI
4. `member-avatars.component.ts` — avatar bubbles
5. Feature flags — all 3 files
6. `app.routes.ts` — add routes
7. `explore-together.component.ts` — list + create form
8. `group-detail.component.ts` — detail + chat
9. `seo.service.ts` + `navigation.service.ts` — wire up
10. `footer.component.*` — add Groups button
11. `location-detail.component.*` — "Who's exploring here?" widget
12. Firestore security rules — deploy via Firebase console

---

## Analytics Events

```typescript
group_created       { spot: spotSlug, difficulty }
group_joined        { group_id, spot: spotSlug }
group_left          { group_id }
group_message_sent  { group_id }
```

---

## When to Ship to Production

1. Feature tested on staging (`johnfabiomb.com/test/malta/groups`)
2. Firestore security rules deployed
3. Flip `FEATURES.GROUPS = true` in `feature-flags.production.ts`
4. Add `/malta/groups` to `prerender-routes.txt` and `sitemap.xml`
5. Run production build + deploy

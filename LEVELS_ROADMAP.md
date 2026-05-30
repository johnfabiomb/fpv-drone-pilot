# Venture Map — Levels Roadmap

## Current state

All users are frozen at **Level 1 · Explorer**.

The level system is fully designed and the 6 tiers are defined in `src/app/shared/utils/level.utils.ts`. The `UserAvatarComponent` already has all 6 border animations ready. Unlocking progression is a single line change in `UserDataService.levelInfo`.

---

## The idea — hike-based levelling

Levels should be earned by **actually going out and hiking**, not by saving places on a screen.

### How it works (proposed)

1. **User joins a group hike** via Explore Together.
2. On the day of the hike, the app prompts them to **start hike tracking** — GPS route recorded live on the map.
3. At the end, they **submit evidence**: a photo taken at the location (ideally with GPS metadata or a manual pin drop to confirm they were there).
4. The submission is **reviewed or auto-validated** (e.g. GPS point must be within X metres of the group's planned meeting spot).
5. On approval, the user earns **XP / a hike credit** toward their next level.

### Level thresholds (proposed, subject to change)

| Level | Name      | Requirement                        |
|-------|-----------|------------------------------------|
| 1     | Explorer  | Everyone starts here               |
| 2     | Wanderer  | 1 verified hike completed          |
| 3     | Scout     | 4 verified hikes                   |
| 4     | Navigator | 10 verified hikes                  |
| 5     | Pioneer   | 25 verified hikes                  |
| 6     | Legend    | 50 verified hikes across Malta     |

### What needs to be built

- **Hike tracking screen** — start/stop GPS recording, show live route on map
- **Evidence submission** — photo upload + location pin confirmation
- **Verification flow** — auto (GPS radius check) or manual (admin review panel)
- **`hikeCredits` field** on the Firestore user doc — increment on approval
- **Update `UserDataService.levelInfo`** to compute from `hikeCredits` instead of being frozen

### Notes

- Levels should reflect real-world effort, not app engagement metrics
- The avatar border effects (fire, rainbow, etc.) are already implemented — they just need to trigger
- Consider a "hike history" page where users can see all their verified hikes with photos
- Photo evidence could be stored in Firebase Storage — factor cost into the rollout plan

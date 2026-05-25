# Google Reviews Accumulator — Design

**Date:** 2026-05-20
**Status:** Approved (pending spec review)

## Problem

Google's Places API returns at most 5 reviews per request, regardless of pricing tier. There is no pagination and no "all reviews" endpoint. The current implementation in `lib/google-reviews.ts` fetches those 5 at request time on every cache miss (24h ISR) and falls back to a hardcoded list in `data/reviews.ts` when empty. The site therefore never shows more than 5 reviews and cannot grow its review corpus over time.

## Goal

Accumulate Google reviews into a local JSON file in the repo. Each refresh pulls the 5 newest from Google and merges them with what's already stored, so the corpus grows monotonically over weeks/months. The app reads the JSON statically — no runtime API calls.

**Explicit non-goals:**
- Backfilling reviews that exist on Google today but aren't in the current 5-newest. (Would require manual seed; out of scope.)
- Removing reviews automatically when an author deletes them on Google. (Stored reviews persist; manual pruning only.)
- Any admin UI, moderation, or per-review hide flag.
- Any external storage (DB, KV, Blob). JSON in the repo only.
- Any automated CI/cron. Refresh is run manually from the developer's machine.

## Architecture

```
Developer machine
  └─ npm run refresh:reviews
        │
        ▼
  scripts/refresh-google-reviews.mjs
     1. Read GOOGLE_PLACES_API_KEY from .env.local (via node --env-file)
     2. GET Places API (New) with rankPreference=NEWEST, fieldMask=reviews
     3. Read data/google-reviews.json (or seed empty if missing)
     4. Merge by review id (existing + fresh; fresh wins on conflict)
     5. Sort by publishTime DESC, write JSON only if changed
     6. Print "added N, updated M" or "no changes"
        │
        ▼ (developer commits + pushes manually)
  main branch
        │
        ▼ (Vercel auto-deploys)
  app/_components/reviews.tsx
     - imports data/google-reviews.json statically
     - sorts by publishTime DESC, renders via ReviewsCarousel
```

There is no runtime fetch, no GitHub Action, no cron, no secret in any CI system. The Places API key lives only in `.env.local` on the developer machine.

## Data shape

`data/google-reviews.json`:

```json
{
  "updatedAt": "2026-05-20T12:00:00.000Z",
  "reviews": [
    {
      "id": "places/ChIJ.../reviews/Ch...",
      "authorName": "Олена М.",
      "rating": 5,
      "text": "Дуже уважний персонал...",
      "publishTime": "2026-04-12T09:23:11Z",
      "photoUrl": "https://lh3.googleusercontent.com/...",
      "authorUrl": "https://www.google.com/maps/contrib/..."
    }
  ]
}
```

Field notes:

- `id` = Google's review resource name. Stable per (author, place); used as the dedup key.
- `publishTime` = ISO timestamp from Google. Stored so render-time sort and conflict resolution are deterministic.
- `text` = `text.text` from Google, falling back to `originalText.text`. Reviews with empty text after fallback are filtered out at write time (not stored).
- `photoUrl` / `authorUrl` are optional; absent reviews omit the keys (not `null`).
- `updatedAt` is written only when the `reviews` array actually changed. Rationale: writing it on every run would dirty `data/google-reviews.json` on every poll and force a commit even when nothing meaningful changed. Trade-off: the field reflects "last change" rather than "last poll." If "last poll" is ever needed, it can be added later as a separate file or surfaced via the script's stdout.

**Intentionally dropped vs. the current `DisplayReview` shape:**
- `initials` — derived at render from `authorName` (pure function, no need to persist).
- `relativeTime` — recomputed at render from `publishTime` (Google's string is stale the moment it's stored).

## The refresh script — `scripts/refresh-google-reviews.mjs`

Plain Node ESM, zero npm dependencies. Run via Node 20+ `--env-file` for `.env.local` loading.

Responsibilities:

1. **Validate env.** Exit non-zero with a clear error if `GOOGLE_PLACES_API_KEY` is missing.
2. **Fetch.** Single GET to `https://places.googleapis.com/v1/places/<PLACE_ID>?languageCode=uk&regionCode=UA` with headers:
   - `X-Goog-Api-Key: <key>`
   - `X-Goog-FieldMask: reviews`
   Add the appropriate query param / header so reviews come back sorted NEWEST first (the exact parameter to be confirmed against current Places API v1 docs at implementation time — the field has changed names historically).
3. **Place ID.** Hardcoded constant matching `data/contacts.ts` (`ChIJMZvh8zgGMkcRSqFDzDj_bHE`). Justification: `.mjs` script importing TypeScript would require a transform step; duplicating a string that changes ~never is the simpler trade.
4. **Map to flat shape** (see Data shape above). Filter out empty-text reviews.
5. **Load existing.** Read `data/google-reviews.json`. If absent, treat as `{ updatedAt: null, reviews: [] }`.
6. **Merge.** Build a `Map` keyed by `id`, seeded with existing reviews, then overlaid with fresh ones. Fresh wins on conflict (author may have edited rating/text).
7. **Sort.** All reviews by `publishTime` DESC. This deterministic ordering is what makes diffs minimal.
8. **Write only if changed.** Pretty-print with 2-space indent. Compare serialized output to current file contents byte-by-byte; if identical, do nothing (`updatedAt` is also unchanged in this branch — explicit decision to keep "no-op" runs producing zero filesystem change so the developer's `git status` stays clean). If changed, write the new file and print `added N, updated M`.
9. **Failure modes.** Network/API failure: exit non-zero with the HTTP status and body for debugging; do not touch the JSON file. Malformed response: same. The developer reruns later.

Approximate size: ~50 lines of code, no dependencies.

## App-side changes

**`app/_components/reviews.tsx`**

Replace:
```ts
const google = await getGoogleReviews();
const list = google.length > 0 ? google : staticToDisplay();
```

With a synchronous import of the JSON and a derived `DisplayReview[]`:
```ts
import data from "@/data/google-reviews.json";
// map to DisplayReview at module scope: add `initials`, drop `publishTime`/etc.
// already sorted DESC in the file
```

Component becomes synchronous (drop the `async`).

**`lib/google-reviews.ts`** — delete entirely. The `DisplayReview` type moves to a small shared location, e.g. `data/google-reviews-types.ts`, or is inlined into `reviews.tsx` if it has only one consumer. (To be decided in the implementation plan.)

**`data/reviews.ts`** — delete entirely.

## package.json

Add to `scripts`:
```json
"refresh:reviews": "node --env-file=.env.local scripts/refresh-google-reviews.mjs"
```

No new dependencies.

## Initial state

First commit of this feature ships `data/google-reviews.json` with `{ "updatedAt": null, "reviews": [] }`. The reviews section on the site will be empty until the developer runs `npm run refresh:reviews` for the first time and commits the result.

If an empty reviews array is unacceptable for the first deploy, the developer should run the script and commit the seeded file in the same PR as the feature itself.

## Edge cases & known limitations

- **More than 5 new reviews between runs.** With one query per run capped at 5, any new reviews beyond the 5 most recent will be missed. On a bi-weekly-ish manual cadence for a clinic that gets a handful of reviews per month, this is unlikely but possible.
- **Author deletes their Google review.** It stays in our JSON. Manual prune is the only remedy. Acceptable per design discussion.
- **Author edits their review.** Caught on next refresh — fresh data overwrites stored fields for the same id.
- **API key compromise.** Key is in `.env.local` only; rotate via Google Cloud console as usual. No CI secret to revoke.
- **Place ID drift.** If the clinic's Google listing is migrated, the hardcoded constant in the script and the value in `data/contacts.ts` must both be updated.

## What we are NOT doing (and why)

- **GitHub Action / cron.** Rejected per "as few resources as possible" — no CI complexity, no secrets management, no scheduled commits in history.
- **Vercel KV / Postgres / Blob.** Rejected for the same reason — no external infra.
- **Two queries per run (NEWEST + MOST_RELEVANT).** Rejected as unnecessary doubling of API calls for a low-volume clinic on a manual schedule.
- **Runtime Google fetch as a fallback.** Rejected — keeping it would mean maintaining two code paths and a runtime API key. The static JSON is the source of truth.
- **Static `data/reviews.ts` fallback.** Removed per design discussion.

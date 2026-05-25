import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "data", "google-reviews.json");
const PLACE_ID = "ChIJMZvh8zgGMkcRoakypy9IenM";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error("Missing GOOGLE_PLACES_API_KEY (expected in .env.local).");
  process.exit(1);
}

const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=uk&regionCode=UA`;
const res = await fetch(url, {
  headers: {
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": "displayName,userRatingCount,rating,reviews",
    Referer: "http://localhost/",
  },
});
if (!res.ok) {
  console.error(`Places API ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const body = await res.json();
const fresh = body.reviews ?? [];
console.log(
  `Place: ${body.displayName?.text ?? "(no name)"} | rating ${body.rating ?? "?"} | userRatingCount ${body.userRatingCount ?? 0} | reviews in response: ${fresh.length}`,
);

const mapped = fresh
  .map((r) => {
    const text = r.text?.text ?? r.originalText?.text ?? "";
    if (!text.trim()) return null;
    const entry = {
      id: r.name,
      authorName: r.authorAttribution?.displayName ?? "",
      rating: Math.max(1, Math.min(5, Math.round(r.rating ?? 0))),
      text,
      publishTime: r.publishTime,
    };
    if (r.authorAttribution?.photoUri) entry.photoUrl = r.authorAttribution.photoUri;
    if (r.authorAttribution?.uri) entry.authorUrl = r.authorAttribution.uri;
    return entry;
  })
  .filter(Boolean);

let existing = { updatedAt: null, reviews: [] };
try {
  existing = JSON.parse(await fs.readFile(OUT, "utf8"));
} catch (err) {
  if (err.code !== "ENOENT") throw err;
}

const byId = new Map(existing.reviews.map((r) => [r.id, r]));
let added = 0;
let updated = 0;
for (const r of mapped) {
  if (byId.has(r.id)) {
    if (JSON.stringify(byId.get(r.id)) !== JSON.stringify(r)) updated++;
  } else {
    added++;
  }
  byId.set(r.id, r);
}

const merged = [...byId.values()].sort(
  (a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime(),
);

const nextReviewsJson = JSON.stringify(merged);
const prevReviewsJson = JSON.stringify(existing.reviews);
if (nextReviewsJson === prevReviewsJson) {
  console.log("no changes");
  process.exit(0);
}

const out = {
  updatedAt: new Date().toISOString(),
  reviews: merged,
};
await fs.writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`added ${added}, updated ${updated} (total ${merged.length})`);

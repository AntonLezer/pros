import "server-only";
import { contacts } from "@/data/contacts";

export type DisplayReview = {
  id: string;
  authorName: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photoUrl?: string;
  authorUrl?: string;
  relativeTime?: string;
};

type GoogleReview = {
  name: string;
  rating: number;
  text?: { text: string; languageCode?: string };
  originalText?: { text: string; languageCode?: string };
  relativePublishTimeDescription?: string;
  publishTime: string;
  authorAttribution: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
};

type PlaceDetailsResponse = {
  reviews?: GoogleReview[];
};

const CACHE_SECONDS = 60 * 60 * 24;

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

function clampRating(n: number): 1 | 2 | 3 | 4 | 5 {
  const r = Math.max(1, Math.min(5, Math.round(n)));
  return r as 1 | 2 | 3 | 4 | 5;
}

function toDisplayReview(r: GoogleReview): DisplayReview {
  return {
    id: r.name,
    authorName: r.authorAttribution.displayName,
    initials: getInitials(r.authorAttribution.displayName),
    rating: clampRating(r.rating),
    text: r.text?.text ?? r.originalText?.text ?? "",
    photoUrl: r.authorAttribution.photoUri,
    authorUrl: r.authorAttribution.uri,
    relativeTime: r.relativePublishTimeDescription,
  };
}

export async function getGoogleReviews(): Promise<DisplayReview[]> {
  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const placeId = contacts.googlePlaceId;
  if (!apiKey || !placeId) return [];

  const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=uk&regionCode=UA`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
      next: { revalidate: CACHE_SECONDS },
    });
    if (!res.ok) {
      console.error("Places API error:", res.status, await res.text());
      return [];
    }
    const data = (await res.json()) as PlaceDetailsResponse;
    const reviews = (data.reviews ?? [])
      .filter((r) => (r.text?.text ?? r.originalText?.text)?.trim())
      .sort(
        (a, b) =>
          new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime(),
      )
      .slice(0, 5)
      .map(toDisplayReview);
    return reviews;
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return [];
  }
}

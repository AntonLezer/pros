import data from "@/data/google-reviews.json";
import ReviewsCarousel, { type DisplayReview } from "./reviews-carousel";

type StoredReview = {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  publishTime: string;
  photoUrl?: string;
  authorUrl?: string;
};

const DATE_FMT = new Intl.DateTimeFormat("uk", { year: "numeric", month: "long" });

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
  return Math.max(1, Math.min(5, Math.round(n))) as 1 | 2 | 3 | 4 | 5;
}

function toDisplay(r: StoredReview): DisplayReview {
  return {
    id: r.id,
    authorName: r.authorName,
    initials: getInitials(r.authorName),
    rating: clampRating(r.rating),
    text: r.text,
    photoUrl: r.photoUrl,
    authorUrl: r.authorUrl,
    relativeTime: DATE_FMT.format(new Date(r.publishTime)),
  };
}

export default function Reviews() {
  const reviews = (data.reviews as StoredReview[]).map(toDisplay);
  return <ReviewsCarousel reviews={reviews} />;
}

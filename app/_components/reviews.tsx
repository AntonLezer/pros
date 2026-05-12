import { getGoogleReviews, type DisplayReview } from "@/lib/google-reviews";
import { reviews as staticReviews } from "@/data/reviews";
import ReviewsCarousel from "./reviews-carousel";

function staticToDisplay(): DisplayReview[] {
  return staticReviews.map((r) => ({
    id: r.id,
    authorName: r.name,
    initials: r.initials,
    rating: r.rating,
    text: r.text,
  }));
}

export default async function Reviews() {
  const google = await getGoogleReviews();
  const list = google.length > 0 ? google : staticToDisplay();
  return <ReviewsCarousel reviews={list} />;
}

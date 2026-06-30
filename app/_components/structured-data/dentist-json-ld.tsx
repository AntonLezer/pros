import googleReviewsData from "@/data/google-reviews.json";
import { buildDentistSchema } from "@/lib/schema/dentist-schema";
import JsonLd from "./json-ld";

type SchemaReview = { rating: number; authorName: string; text: string };

export default function DentistJsonLd() {
  const reviews = googleReviewsData.reviews as SchemaReview[];
  return <JsonLd data={buildDentistSchema(reviews)} />;
}

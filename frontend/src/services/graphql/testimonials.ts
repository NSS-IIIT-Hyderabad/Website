import { runGraphQLQuery } from "@/services/graphql/client";

export type Testimonial = {
  id?: string;
  name: string;
  title: string;
  period?: string;
  quote: string;
};

const TESTIMONIALS_QUERY = `
  query ViewTestimonials {
    viewTestimonials {
      id
      name
      title
      period
      quote
    }
  }
`;

export async function getTestimonialsFromDB(): Promise<Testimonial[]> {
  const data = await runGraphQLQuery<{ viewTestimonials: Testimonial[] }>(
    TESTIMONIALS_QUERY,
  );
  
  if (!data || !Array.isArray(data.viewTestimonials)) {
    return [];
  }

  return data.viewTestimonials;
}

// getTestimonials.tsx - Fetch testimonials from GraphQL backend

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

function getGraphQLEndpoints() {
  return [
    'http://backend:8000/graphql',
    'http://localhost:8000/graphql',
    'http://localhost/api/graphql',
  ];
}

async function fetchTestimonialsFromGraphQL(): Promise<Testimonial[] | null> {
  for (const endpoint of getGraphQLEndpoints()) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: TESTIMONIALS_QUERY }),
        cache: 'no-store',
      });

      if (!response.ok) {
        continue;
      }

      const payload = await response.json();
      const testimonials = payload?.data?.viewTestimonials;
      if (Array.isArray(testimonials)) {
        return testimonials as Testimonial[];
      }
    } catch {
      // Try the next endpoint.
    }
  }

  return null;
}

export async function getTestimonialsFromDB(): Promise<Testimonial[]> {
  const testimonials = await fetchTestimonialsFromGraphQL();
  if (!testimonials || testimonials.length === 0) {
    throw new Error('Failed to load testimonials from GraphQL backend');
  }
  return testimonials;
}

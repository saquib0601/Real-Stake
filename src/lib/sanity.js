import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function getProperties() {
  const query = `*[_type == "property"] {
    _id,
    title,
    slug,
    price,
    description,
    mainImage {
      "url": asset->url
    },
    images[] {
      "url": asset->url
    },
    features,
    contactNumber
  }`;

  return client.fetch(query);
} 
import { createClient } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function getProperties() {
  const query = `*[_type == "property"] {
    _id,
    propertyName,
    slug,
    type,
    status,
    price,
    funded,
    totalReturn,
    yearlyReturn,
    netYield,
    description,
    features,
    location,
    ready,
    rented,
    "mainImage": images[isMainImage == true][0] {
      "url": asset->url,
      alt
    },
    "images": images[] {
      "url": asset->url,
      alt,
      caption
    },
    investmentDetails {
      minimumInvestment,
      targetReturn,
      projectedRentalYield,
      investmentPeriod,
      expectedROI
    }
  }`;

  return client.fetch(query);
}

export async function getPropertyBySlug(idOrSlug) {
  // First try to find by _id
  let query = `*[_type == "property" && _id == $idOrSlug][0] {
    _id,
    propertyName,
    slug,
    type,
    status,
    price,
    funded,
    totalReturn,
    yearlyReturn,
    netYield,
    description,
    features,
    location,
    ready,
    rented,
    "mainImage": images[isMainImage == true][0] {
      "url": asset->url,
      alt
    },
    "images": images[] {
      "url": asset->url,
      alt,
      caption
    },
    investmentDetails {
      minimumInvestment,
      targetReturn,
      projectedRentalYield,
      investmentPeriod,
      expectedROI
    }
  }`;

  let property = await client.fetch(query, { idOrSlug });

  // If not found by _id, try to find by slug
  if (!property) {
    query = `*[_type == "property" && slug.current == $idOrSlug][0] {
      _id,
      propertyName,
      slug,
      type,
      status,
      price,
      funded,
      totalReturn,
      yearlyReturn,
      netYield,
      description,
      features,
      location,
      ready,
      rented,
      "mainImage": images[isMainImage == true][0] {
        "url": asset->url,
        alt
      },
      "images": images[] {
        "url": asset->url,
        alt,
        caption
      },
      investmentDetails {
        minimumInvestment,
        targetReturn,
        projectedRentalYield,
        investmentPeriod,
        expectedROI
      }
    }`;

    property = await client.fetch(query, { idOrSlug });
  }

  return property;
} 
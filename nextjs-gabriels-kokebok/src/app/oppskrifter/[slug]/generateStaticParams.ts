// src/app/oppskrifter/[slug]/generateStaticParams.ts

import { fetchAllSlugs } from '@/lib/sanity';  // Import the fetchAllSlugs function

export async function generateStaticParams() {
  // Fetch all slugs for the recipes
  const slugs = await fetchAllSlugs();

  // Return paths for all slugs
  return slugs.map((slug: string)=> ({
    slug: slug,  // This is the dynamic parameter for the page
  }));
}

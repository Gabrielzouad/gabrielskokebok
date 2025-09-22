import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ajb4bzi3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Ensures fresh data when needed
});

const builder = imageUrlBuilder(client);

export function urlForImage(source: any) {
  return builder.image(source);
}

// ✅ Fetch All Recipes (stale-while-revalidate)
export async function getRecipes() {
  try {
    const recipes = await client.fetch(
      `*[_type == "recipe"]{
        _id,
        title,
        slug,
        mainImage,
        cookingTime,
        views
      }`,
      {}, // No query parameters
      { next: { revalidate: 0 } } // Stale-while-revalidate behavior
    );
    return recipes || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

// ✅ Fetch Single Recipe (stale-while-revalidate)
export async function getRecipeBySlug(slug: string) {
  const recipe = await client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{
      _id,
      title,
      mainImage,
      cookingTime,
      ingredients,
      instructions,
      author,
      slug
    }`,
    { slug },
    { next: { revalidate: 0 } } // Stale-while-revalidate behavior
  );

  return recipe;
}

// ✅ Fetch Hero Section Image (stale-while-revalidate)
export async function getHeroImage() {
  const hero = await client.fetch(
    `*[_type == "hero"][0]{
      subtitle,
      "recipeImage": featuredRecipe->mainImage,
      "recipeSlug": featuredRecipe->slug.current
    }`,
    {},
    { next: { revalidate: 0 } } // Stale-while-revalidate behavior
  );

  return hero || {}; // Ensure it never returns undefined
}

// ✅ Fetch Recipes by Category (stale-while-revalidate)
export async function getrecipesByCategory(categorySlug: string) {
  try {
    const recipes = await client.fetch(
      `*[_type == "recipe" && category->slug.current == $categorySlug]{
        _id,
        title,
        slug,
        mainImage,
        cookingTime,
        views
      }`,
      { categorySlug },
      { next: { revalidate: 0 } } // Stale-while-revalidate behavior
    );
    return recipes || [];
  } catch (error) {
    console.error(
      `Error fetching recipes for category ${categorySlug}:`,
      error
    );
    return [];
  }
}

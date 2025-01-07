import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Image URL Builder Setup
const builder = imageUrlBuilder(client)

export function urlForImage(source: { _type: string, asset: { _ref: string } }) {
  return builder.image(source)
}

// Type for a Recipe
interface Recipe {
  portions: number;
  title: string;
  slug: { current: string };
  mainImage: { _type: string, asset: { _ref: string } };
  ingredients: string[];
  instructions: string;
  author: string;
}

// Function to fetch a recipe by its slug
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipe = await client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{
      title,
      slug,
      mainImage,
      ingredients,
      instructions,
      "author": author->name
    }`,
    { slug }
  )

  return recipe || null;  // Return null if no recipe is found
}

// Function to fetch all slugs
export async function fetchAllSlugs(): Promise<string[]> {
  const query = `*[_type == "recipe" && defined(slug.current)]{
    slug
  }`;

  const result = await client.fetch(query);

  // Map the result to extract slugs
  return result.map((recipe: { slug: { current: string } }) => recipe.slug.current);
}

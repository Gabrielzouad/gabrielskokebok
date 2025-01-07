import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Image URL Builder Setup
const builder = imageUrlBuilder(client)

export function urlForImage(source: string){
  return builder.image(source)
}

// Function to fetch a recipe by its slug
export async function getRecipeBySlug(slug: string) {
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


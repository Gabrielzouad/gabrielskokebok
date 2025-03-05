import imageUrlBuilder from "@sanity/image-url"
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ajb4bzi3",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}

export async function getRecipes() {
  try {
    const recipes = await client.fetch(`*[_type == "recipe"]{
      _id,
      title,
      slug,
      mainImage,
      cookingTime,
      views
    }`)
    return recipes || []
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return []
  }
}

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
  )
  return recipe
}

export async function getHeroImage() {
  const hero = await client.fetch(
    `*[_type == "hero"][0]{
      subtitle,
      "recipeImage": featuredRecipe->mainImage,
      "recipeSlug": featuredRecipe->slug.current
    }`
  );

  return hero || {}; // Ensure it never returns undefined
}


import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}

export async function getRecipeBySlug(slug: string) {
  return client.fetch(
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
}

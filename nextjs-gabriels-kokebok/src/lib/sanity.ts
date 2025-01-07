import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}


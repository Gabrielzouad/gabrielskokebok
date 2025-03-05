export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Recipe {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImage
  cookingTime: number
  views: number
  ingredients?: string[]
  instructions?: any[]
  author?: string
}

export interface RecipeDetail extends Recipe {
  ingredients: string[]
  instructions: any[]
  author: string
}

export interface Hero {
  title: string
  subtitle?: string
  featuredRecipe: {
    _ref: string
  }
}


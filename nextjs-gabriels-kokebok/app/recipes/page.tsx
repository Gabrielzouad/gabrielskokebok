import { getRecipes } from "@/sanity/lib"
import RecipeCard from "../components/recipe-card"
import type { Recipe } from "@/types/sanity"

export default async function RecipesPage() {
  const recipes = await getRecipes()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">All Recipes</h1>
        <p className="text-muted-foreground">Browse our collection of delicious recipes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe: Recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No recipes found. Add some recipes in your Sanity studio!</p>
          </div>
        )}
      </div>
    </div>
  )
}


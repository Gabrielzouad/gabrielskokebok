import Hero from '@/components/Hero';
import RecipeGrid from '@/components/RecipeGrid';
import { client } from '@/sanity/client';

async function getRecipes() {
  return await client.fetch(`
    *[_type == "recipe"] {
      _id,
      title,
      slug,
      mainImage,
      cookingTime,
      views
    }
  `);
}

export default async function Home() {
  const recipes = await getRecipes();
  return (
    <main>
      <Hero />
      <div className='container mx-auto px-4 py-12'>
        <RecipeGrid recipes={recipes} />
      </div>
    </main>
  );
}

import { getrecipesByCategory } from '@/sanity/lib';

import RecipeCard from '../components/recipe-card';

export const revalidate = 60;

export default async function MiddagPage() {
  const recipes = await getrecipesByCategory('middag');

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl md:text-4xl font-bold mb-6'>Middager</h1>

      {recipes.length === 0 ? (
        <p>Ingen middag-oppskrifter funnet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {recipes.map((recipe: any) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

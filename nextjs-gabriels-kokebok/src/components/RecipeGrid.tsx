'use client';

import { useState } from 'react';
import RecipeCard from './RecipeCard';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Recipe {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string;
  cookingTime: number;
  views: number;
}

interface RecipeGridProps {
  recipes: Recipe[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <section className='container mx-auto px-4 py-12'>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>{recipes.length} recipes</h2>
        <div className='flex gap-2'>
          <Button
            variant={isGridView ? 'default' : 'ghost'}
            size='icon'
            onClick={() => setIsGridView(true)}
          >
            <LayoutGrid className='h-5 w-5' />
          </Button>
          <Button
            variant={!isGridView ? 'default' : 'ghost'}
            size='icon'
            onClick={() => setIsGridView(false)}
          >
            <LayoutList className='h-5 w-5' />
          </Button>
        </div>
      </div>

      <div
        className={
          isGridView
            ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-6'
        }
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            slug={recipe.slug.current}
            mainImage={recipe.mainImage}
            cookingTime={recipe.cookingTime}
            views={recipe.views}
          />
        ))}
      </div>
    </section>
  );
}

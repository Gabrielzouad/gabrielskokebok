import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { Clock, Users } from 'lucide-react';
import { client } from '@/sanity/client';

interface Recipe {
  title: string;
  slug: { current: string };
  mainImage: string;
  cookingTime: number;
  servings: number;
}

interface HeroData {
  title: string;
  subtitle: string;
  featuredRecipe: Recipe;
}

async function getHeroData(): Promise<HeroData> {
  return await client.fetch(`
    *[_type == "hero"][0]{
      title,
      subtitle,
      featuredRecipe->{
        title,
        slug,
        mainImage,
        cookingTime,
        servings
      }
    }
  `);
}

export default async function Hero() {
  const hero = await getHeroData();

  return (
    <section className='bg-gray-50'>
      <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='grid gap-8 md:grid-cols-2 md:items-center'>
          <div>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
              {hero.title}
            </h1>
            <p className='mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl'>
              {hero.subtitle}
            </p>
            <div className='mt-8'>
              <Button asChild>
                <Link href='/recipes'>Explore All Recipes</Link>
              </Button>
            </div>
          </div>
          <div className='mt-12 md:mt-0'>
            <div className='overflow-hidden rounded-lg bg-white shadow'>
              <div className='relative h-64 w-full sm:h-72 md:h-96'>
                <Image
                  src={urlForImage(hero.featuredRecipe.mainImage).url()}
                  alt={hero.featuredRecipe.title}
                  fill
                  className='object-cover'
                  priority
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {hero.featuredRecipe.title}
                </h3>
                <div className='mt-2 flex items-center justify-between text-sm text-gray-500'>
                  <div className='flex items-center'>
                    <Clock className='mr-1 h-4 w-4' />
                    <span>{hero.featuredRecipe.cookingTime} mins</span>
                  </div>
                  <div className='flex items-center'>
                    <Users className='mr-1 h-4 w-4' />
                    <span>{hero.featuredRecipe.servings} servings</span>
                  </div>
                </div>
                <div className='mt-4'>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href={`/recipes/${hero.featuredRecipe.slug.current}`}>
                      View Recipe
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

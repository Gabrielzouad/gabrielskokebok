import { getRecipes, getHeroImage, urlForImage } from '@/sanity/lib';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecipeCard from './components/recipe-card';
import type { Recipe } from '@/types/sanity';

export default async function Home() {
  const recipes = await getRecipes();
  const { subtitle, recipeImage, recipeSlug } = await getHeroImage();

  const imageUrl = recipeImage
    ? urlForImage(recipeImage).width(1200).height(800).url()
    : '/fallback-image.jpg';

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-[70vh] min-h-[600px] w-full overflow-hidden'>
        <Image
          src={imageUrl}
          alt='Delicious food'
          fill
          priority
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/30' />

        <div className='container relative h-full mx-auto px-4 flex flex-col justify-center'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in'>
              Gabriels Kokebok
            </h1>
            <p className='text-lg md:text-xl text-white/90 mb-8 animate-fade-up'>
              {subtitle}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 animate-fade-up'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
                <Input
                  type='text'
                  placeholder='Søk etter oppskrifter...'
                  className='pl-10 h-12 bg-white/90 backdrop-blur-sm border-none text-foreground'
                />
              </div>
              <Button size='lg' className='h-12'>
                Søk etter oppskrifter
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className='container mx-auto px-4 py-16'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-10'>
          <div className='animate-fade-in'>
            <h2 className='text-3xl font-bold'>Populære Oppskrifter</h2>
            <p className='text-muted-foreground mt-2'>
              Mine mest populære oppskrifter akkurat nå.
            </p>
          </div>

          <div className='animate-fade-in'>
            <Link href='/recipes'>
              <Button variant='ghost' className='group'>
                Se Alle Oppskrifter
                <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {recipes && recipes.length > 0 ? (
            recipes
              .slice(0, 4)
              .map((recipe: Recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <p className='text-muted-foreground'>
                Ingen oppskrifter å vise. D:
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <div className='container mx-auto px-4 py-16'>
        <div className='bg-primary/10 rounded-2xl p-8 md:p-12'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-8'>
            <div className='md:w-1/2 animate-fade-in'>
              <h2 className='text-3xl font-bold'>Hold deg oppdatert</h2>
              <p className='text-muted-foreground mt-2 mb-4'>
                Abonner på nyhetsbrevet mitt for å motta oppdateringer om nye
                oppskrifter og innlegg.
              </p>
            </div>

            <div className='md:w-1/2 animate-fade-in'>
              <div className='flex flex-col sm:flex-row gap-3'>
                <Input
                  type='email'
                  placeholder='Skriv inn e-posten din...'
                  className='h-12'
                />
                <Button size='lg' className='h-12'>
                  Abonner
                </Button>
              </div>
              <p className='text-xs text-muted-foreground mt-2'>
                Ved å abonnere, godtar du retningslinjene våre for personvern.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getRecipeBySlug } from '@/sanity/lib';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Printer, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib';

export default async function RecipeDetail({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  const imageUrl = urlForImage(recipe.mainImage).width(1200).height(800).url();

  return (
    <div className='container mx-auto px-4 py-8 animate-fade-in'>
      <div className='mb-6'>
        <Link
          href='/recipes'
          className='inline-flex items-center text-muted-foreground hover:text-primary transition-colors'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Tilbake til oppskrifter
        </Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <h1 className='text-3xl md:text-4xl font-bold mb-4'>
            {recipe.title}
          </h1>

          <div className='relative rounded-xl overflow-hidden mb-8'>
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={recipe.title}
              width={800}
              height={500}
              className='w-full h-auto object-cover'
            />

            <div className='absolute top-4 right-4 flex space-x-2'>
              <Button
                size='icon'
                variant='secondary'
                className='rounded-full bg-background/80 backdrop-blur-sm'
              >
                <Bookmark className='h-5 w-5' />
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className='rounded-full bg-background/80 backdrop-blur-sm'
              >
                <Share2 className='h-5 w-5' />
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className='rounded-full bg-background/80 backdrop-blur-sm'
              >
                <Printer className='h-5 w-5' />
              </Button>
            </div>
          </div>

          <div className='flex items-center mb-6'>
            <Clock className='h-5 w-5 text-muted-foreground mr-2' />
            <span>Cooking Time: {recipe.cookingTime} minutes</span>
          </div>

          <Tabs defaultValue='instructions'>
            <TabsList className='w-full'>
              <TabsTrigger value='instructions' className='flex-1'>
                Instrukser
              </TabsTrigger>
              <TabsTrigger value='ingredients' className='flex-1'>
                Ingredisener
              </TabsTrigger>
            </TabsList>

            <TabsContent value='instructions' className='pt-6'>
              <div className='prose prose-stone dark:prose-invert max-w-none'>
                <PortableText value={recipe.instructions} />
              </div>
            </TabsContent>

            <TabsContent value='ingredients' className='pt-6'>
              <ul className='space-y-2'>
                {recipe.ingredients &&
                  recipe.ingredients.map(
                    (ingredient: string, index: number) => (
                      <li
                        key={index}
                        className='ingredient-item flex items-center p-2 rounded-md'
                      >
                        <div className='w-2 h-2 rounded-full bg-primary mr-3'></div>
                        <p>{ingredient}</p>
                      </li>
                    )
                  )}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div className='lg:col-span-1'>
          <div className='bg-card rounded-xl p-6 shadow-sm mb-8'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 rounded-full bg-muted overflow-hidden mr-3 flex items-center justify-center'>
                <span className='text-lg font-bold'>
                  {recipe.author?.charAt(0) || 'C'}
                </span>
              </div>
              <div>
                <p className='font-medium'>{recipe.author || 'Chef'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

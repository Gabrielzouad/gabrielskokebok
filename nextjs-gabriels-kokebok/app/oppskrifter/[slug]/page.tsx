import { getRecipeBySlug } from '@/sanity/lib';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Printer, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib';

const instructionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <li className='mb-2'>{children}</li> // each paragraph becomes a list item
    ),
  },
  list: {
    bullet: ({ children }) => <ul className='list-disc pl-6'>{children}</ul>,
    number: ({ children }) => (
      <ol className='list-decimal pl-6 space-y-2'>{children}</ol>
    ),
  },
};

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
      {/* Back button */}
      <div className='mb-6'>
        <Link
          href='/oppskrifter'
          className='inline-flex items-center text-muted-foreground hover:text-primary transition-colors'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Tilbake til oppskrifter
        </Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left: title, image, instructions */}
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
            <span>{recipe.cookingTime} minutter</span>
          </div>

          {/* Instructions as a numbered list */}
          <div>
            <h2 className='text-2xl font-semibold mb-4'>Instrukser</h2>
            <ol className='list-decimal pl-6 space-y-3 text-lg leading-relaxed'>
              <PortableText
                value={recipe.instructions}
                components={instructionComponents}
              />
            </ol>
          </div>
        </div>

        {/* Right: ingredients */}
        <div className='lg:col-span-1'>
          <div className='bg-card rounded-xl p-6 shadow-sm'>
            <h2 className='text-xl font-semibold mb-4'>Ingredienser</h2>
            <ul className='space-y-2'>
              {recipe.ingredients?.map((ingredient: string, index: number) => (
                <li
                  key={index}
                  className='ingredient-item flex items-center p-2 rounded-md'
                >
                  <div className='w-2 h-2 rounded-full bg-primary mr-3'></div>
                  <p>{ingredient}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

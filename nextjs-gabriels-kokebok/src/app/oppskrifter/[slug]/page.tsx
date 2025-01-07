import { getRecipeBySlug, urlForImage } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Share2, Heart, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileIngredients } from '@/components/Mobile-ingredientsButton';

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content Column */}
        <div className='lg:col-span-2'>
          <div className='relative'>
            <Image
              src={urlForImage(recipe.mainImage).url()}
              alt={recipe.title}
              width={800}
              height={600}
              className='w-full rounded-lg aspect-[4/3] object-cover'
              priority
            />
          </div>

          {/* Social Sharing Section */}
          <div className='flex flex-wrap gap-4 my-6'>
            <Button variant='outline' size='sm'>
              <Heart className='h-4 w-4 mr-2' />
              Favoritt
            </Button>
            <Button variant='outline' size='sm'>
              <Copy className='h-4 w-4 mr-2' />
              Kopier lenke
            </Button>
            <Button variant='outline' size='sm'>
              <Share2 className='h-4 w-4 mr-2' />
              Del på Facebook
            </Button>
          </div>

          {/* Title and Description */}
          <h1 className='text-4xl font-bold mb-4'>{recipe.title}</h1>
          {/* Instructions */}
          <div className='prose max-w-none'>
            <h2 className='text-2xl font-semibold mb-4'>Instruksjoner</h2>
            <PortableText value={recipe.instructions} />
          </div>
        </div>
        {/* Desktop Sidebar */}
        <div className='hidden lg:block lg:col-span-1'>
          <div className='bg-gray-50 p-6 rounded-lg sticky top-4'>
            <h2 className='text-xl font-semibold mb-6'>INGREDIENSER</h2>

            {/* Portions */}
            <div className='flex justify-between items-center mb-6 border-t border-b border-dashed border-gray-300 py-4'>
              <span>porsjoner</span>
            </div>

            {/* Ingredients List */}
            <ul className='space-y-3'>
              {recipe.ingredients?.map((ingredient: string, index: number) => (
                <li key={index} className='flex justify-between'>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Ingredients Toggle */}
      <MobileIngredients
        portions={recipe.portions}
        ingredients={recipe.ingredients || []}
      />
    </div>
  );
}

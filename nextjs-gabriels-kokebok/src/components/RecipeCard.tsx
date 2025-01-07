import { urlForImage } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

interface RecipeCardProps {
  title: string;
  slug: string;
  mainImage: string;
  cookingTime: number;
  views: number;
}

export default function RecipeCard({
  title,
  slug,
  mainImage,
  cookingTime,
  views,
}: RecipeCardProps) {
  return (
    <Link href={`/recipes/${slug}`}>
      <div className='group relative aspect-square overflow-hidden rounded-3xl bg-gray-100'>
        <Image
          src={urlForImage(mainImage).url()}
          alt={title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        <div className='absolute bottom-0 w-full p-6 text-white'>
          <h3 className='text-2xl font-semibold'>{title}</h3>
          <div className='mt-2 flex gap-4 text-sm'>
            <span>{cookingTime} mins</span>
            <span>{views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/lib/sanity';

interface CategoryCardProps {
  title: string;
  slug: string;
  image: string;
}

export default function CategoryCard({
  title,
  slug,
  image,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`} className='group block'>
      <div className='relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100'>
        <Image
          src={urlForImage(image).url()}
          alt={title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <h3 className='mt-3 text-lg font-medium'>{title}</h3>
    </Link>
  );
}

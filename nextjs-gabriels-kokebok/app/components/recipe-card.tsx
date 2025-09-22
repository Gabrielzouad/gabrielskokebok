'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { urlForImage } from '@/sanity/lib';
import type { Recipe } from '@/types/sanity';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = urlForImage(recipe.mainImage).width(600).height(600).url();

  return (
    <Link href={`/oppskrifter/${recipe.slug.current}`}>
      <motion.div
        className='group relative overflow-hidden rounded-3xl shadow-md'
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className='relative h-96 w-full overflow-hidden'>
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={recipe.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent' />
        </div>

        {/* Content Overlay */}
        <div className='absolute bottom-0 left-0 right-0 p-4'>
          <h3 className='text-lg font-semibold text-white leading-snug'>
            {recipe.title}
          </h3>

          <div className='mt-2 flex items-center text-sm text-gray-200'>
            <Clock className='h-4 w-4 mr-1' />
            <span>{recipe.cookingTime} min</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

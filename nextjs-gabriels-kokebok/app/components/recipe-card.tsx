'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { urlForImage } from '@/sanity/lib';
import type { Recipe } from '@/types/sanity';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = urlForImage(recipe.mainImage).width(600).height(400).url();

  return (
    <motion.div
      className='recipe-card group relative overflow-hidden rounded-xl bg-card shadow-md dark:bg-primary'
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='relative h-48 w-full overflow-hidden'>
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={recipe.title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
      </div>

      <div className='p-4'>
        <h3 className='text-xl font-bold line-clamp-1'>{recipe.title}</h3>

        <div className='mt-4 flex items-center justify-between text-sm'>
          <div className='flex items-center space-x-1'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Eye className='h-4 w-4 text-muted-foreground' />
            <span>{recipe.views} Visninger</span>
          </div>
        </div>

        <motion.div
          className='mt-4'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <Link href={`/recipes/${recipe.slug.current}`}>
            <button className='w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors'>
              Se oppskrift
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className='spoon-decoration'
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 0.2 : 0,
          scale: isHovered ? 1 : 0,
          x: Math.random() * 100,
          y: Math.random() * 100,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

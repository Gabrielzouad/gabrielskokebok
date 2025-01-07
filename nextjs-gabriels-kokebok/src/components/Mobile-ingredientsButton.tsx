'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BeakerIcon } from 'lucide-react';
import { useState } from 'react';

interface MobileIngredientsProps {
  portions: number;
  ingredients: string[];
}

export function MobileIngredients({
  portions,
  ingredients,
}: MobileIngredientsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size='icon'
          className='fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center h-14 w-14 rounded-full shadow-lg md:hidden'
        >
          <BeakerIcon className='h-6 w-6' />
        </Button>
      </SheetTrigger>
      <SheetContent side='bottom' className='h-full overflow-y-auto '>
        <div className='pt-6'>
          <SheetTitle className='text-xl font-semibold mb-6'>
            INGREDIENSER
          </SheetTitle>

          <div className='flex justify-between items-center mb-6 border-t border-b border-dashed border-gray-300 py-4'>
            <span>{portions} porsjoner</span>
          </div>

          <ul className='space-y-3'>
            {ingredients.map((ingredient, index) => (
              <li key={index} className='flex justify-between'>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

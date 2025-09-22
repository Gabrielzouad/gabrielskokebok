'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, ChefHat, Search } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

export default function EnhancedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Middag', href: '/middag' },
    { name: 'Oppskrifter', href: '/oppskrifter' },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ChefHat className='h-8 w-8 text-primary' />
            </motion.div>
            <motion.span
              className='text-xl font-bold'
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Gabriels Kokebok
            </motion.span>
          </Link>

          <div className='hidden md:flex items-center space-x-6'>
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={item.href}
                  className='text-foreground hover:text-primary transition-colors font-medium'
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className='flex items-center space-x-3'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>

            <div className='md:hidden'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='ghost' size='icon' className='rounded-full'>
                    <Menu className='h-6 w-6' />
                  </Button>
                </SheetTrigger>
                <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                  <div className='flex flex-col h-full'>
                    <div className='flex items-center justify-between py-4'>
                      <div className='flex items-center space-x-2'>
                        <ChefHat className='h-6 w-6 text-primary' />
                        <span className='text-lg font-bold'>
                          Gabriels kokebok
                        </span>
                      </div>
                      <SheetClose asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full'
                        >
                          <X className='h-5 w-5' />
                        </Button>
                      </SheetClose>
                    </div>

                    <div className='py-4'>
                      <div className='relative'>
                        <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          placeholder='Search recipes...'
                          className='pl-10 rounded-full'
                        />
                      </div>
                    </div>

                    <nav className='flex flex-col space-y-4 py-4'>
                      {navItems.map((item) => (
                        <SheetClose asChild key={item.name}>
                          <Link
                            href={item.href}
                            className='text-foreground hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-muted'
                          >
                            {item.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>

                    <div className='mt-auto py-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          © 2024 Gabriels kokebok
                        </span>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

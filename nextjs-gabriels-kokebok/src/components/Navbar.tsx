import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navbar() {
  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between container'>
          {/* Logo */}
          <Link href='/' className='text-xl font-bold'>
            CookBook
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            <Link
              href='/oppskrifter'
              className='text-sm font-medium hover:text-primary'
            >
              Recipes
            </Link>
            <Link
              href='/kategorier'
              className='text-sm font-medium hover:text-primary'
            >
              Categories
            </Link>
            <Link
              href='/about'
              className='text-sm font-medium hover:text-primary'
            >
              About
            </Link>
          </nav>

          {/* Search */}
          <div className='hidden md:flex items-center space-x-4'>
            <div className='relative w-64'>
              <Input
                type='search'
                placeholder='Search recipes...'
                className='pl-8'
              />
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button variant='ghost' className='md:hidden' size='icon'>
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </header>
  );
}

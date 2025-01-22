'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { client } from '@/sanity/client';
import { urlForImage } from '@/lib/sanity';

type SearchResult = {
  _id: string;
  _type: 'category' | 'recipe';
  title: string;
  slug: { current: string };
  mainImage?: any;
  ingredients?: string[];
};

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(async () => {
    if (searchTerm) {
      const query = `*[_type in ["recipe"] && (
        title match "*" + $searchTerm + "*" ||
        _type == "recipe" && ingredients[] match "*" + $searchTerm + "*"
      )] {
        _id,
        _type,
        title,
        "slug": slug.current,
        mainImage,
        ingredients
      }`;

      try {
        const searchResults = await client.fetch<SearchResult[]>(query, {
          searchTerm,
        });
        console.log('Search results:', searchResults);
        setResults(searchResults);
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
        setShowResults(true);
      }
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setShowResults(false);
  };

  return (
    <header className='border-b relative'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between container'>
          {/* Logo */}
          <Link
            href='/'
            className='text-xl font-bold'
            onClick={handleLinkClick}
          >
            CookBook
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            <Link
              href='/oppskrifter'
              className='text-sm font-medium hover:text-primary'
              onClick={handleLinkClick}
            >
              Recipes
            </Link>
            <Link
              href='/kategorier'
              className='text-sm font-medium hover:text-primary'
              onClick={handleLinkClick}
            >
              Categories
            </Link>
            <Link
              href='/about'
              className='text-sm font-medium hover:text-primary'
              onClick={handleLinkClick}
            >
              About
            </Link>
          </nav>

          {/* Search */}
          <div
            className='hidden md:flex items-center space-x-4'
            ref={searchContainerRef}
          >
            <div className='relative w-64'>
              <Input
                type='search'
                placeholder='Search recipes or categories...'
                className='pl-8'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            </div>

            {/* Search Results */}
            {showResults && (
              <div className='absolute left-0 right-0 top-full mt-1 bg-background border rounded-md shadow-lg z-10'>
                <div className='p-4'>
                  <h2 className='text-lg font-semibold mb-2'>
                    Search Results:
                  </h2>
                  {results.length > 0 ? (
                    <ul className='space-y-4'>
                      {results.map((result) => (
                        <li
                          key={result._id}
                          className='bg-secondary p-4 rounded flex items-center space-x-4'
                        >
                          <Link
                            href={`/oppskrifter/${result.slug}`}
                            className='flex items-center space-x-4 hover:text-primary'
                            onClick={handleLinkClick}
                          >
                            {result.mainImage && (
                              <Image
                                src={
                                  urlForImage(result.mainImage)
                                    .width(100)
                                    .height(100)
                                    .url() || '/placeholder.svg'
                                }
                                alt={result.title}
                                width={100}
                                height={100}
                                className='rounded object-cover'
                              />
                            )}
                            <div>
                              <strong>{result.title}</strong>
                              {result._type === 'recipe' &&
                                result.ingredients && (
                                  <p className='text-sm text-muted-foreground mt-1'>
                                    Ingredients:{' '}
                                    {result.ingredients.slice(0, 3).join(', ')}
                                    {result.ingredients.length > 3 && '...'}
                                  </p>
                                )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      {searchTerm
                        ? 'Fant ingen resultater for søket.'
                        : 'Søk etter oppskrifter eller ingredienser.'}
                    </p>
                  )}
                </div>
              </div>
            )}
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

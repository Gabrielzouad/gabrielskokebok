import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label='Breadcrumb'
      className='flex items-center space-x-1 text-sm text-muted-foreground'
    >
      <Link href='/' className='flex items-center hover:text-foreground'>
        <Home className='h-4 w-4' />
        <span className='sr-only'>Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className='flex items-center'>
          <ChevronRight className='h-4 w-4' />
          {index === items.length - 1 ? (
            <span className='ml-1 font-medium text-foreground'>
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className='ml-1 hover:text-foreground'>
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

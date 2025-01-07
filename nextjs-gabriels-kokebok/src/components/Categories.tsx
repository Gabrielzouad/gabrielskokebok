import Link from 'next/link';
import CategoryCard from './CategoryCard';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  image: any;
}

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className='py-12'>
      <div className='container'>
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='text-3xl font-bold'>Popular Categories</h2>
          <Link
            href='/categories'
            className='text-sm underline-offset-4 hover:underline'
          >
            See all
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              title={category.title}
              slug={category.slug.current}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

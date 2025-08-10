import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Placeholder data for blog posts
const posts = [
  {
    id: 1,
    title: '5 Ways to Style a Leather Jacket for Fall',
    href: '/blog/style-leather-jacket',
    description: 'From casual weekends to chic evenings, discover how to make the most of this timeless wardrobe staple.',
    imageUrl: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: { title: 'Style Guide', href: '/blog/category/style' },
  },
  {
    id: 2,
    title: 'The Rise of Sustainable Fashion',
    href: '/blog/sustainable-fashion',
    description: 'Learn about the importance of eco-friendly materials and how we are committed to a greener future.',
    imageUrl: 'https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: { title: 'Sustainability', href: '/blog/category/sustainability' },
  },
  {
    id: 3,
    title: 'Accessory Spotlight: The Chrono Watch',
    href: '/blog/accessory-spotlight-watch',
    description: 'A deep dive into our best-selling timepiece. Discover the craftsmanship and design behind the Timeless Co. watch.',
    imageUrl: 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: { title: 'Product Spotlight', href: '/blog/category/products' },
  },
];

const BlogPreview = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">From Our Journal</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Insights, trends, and stories from the world of fashion.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <Link
                    to={post.category.href}
                    className="relative z-10 rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {post.category.title}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    <Link to={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{post.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
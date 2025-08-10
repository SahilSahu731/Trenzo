import React from 'react';
import { Instagram } from 'lucide-react';

// Placeholder data for the feed
const instagramPosts = [
  { id: 1, imageUrl: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', likes: 1204, comments: 35 },
  { id: 2, imageUrl: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', likes: 2345, comments: 58 },
  { id: 3, imageUrl: 'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', likes: 987, comments: 22 },
  { id: 4, imageUrl: 'https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', likes: 1876, comments: 45 },
  { id: 5, imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', likes: 3012, comments: 78 },
  { id: 6, imageUrl: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', likes: 1543, comments: 41 },
];

const InstagramFeed = () => {
  return (
    <section className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Follow Us on Instagram
          </h2>
          <a href="#" className="mt-4 inline-block text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            @EShopOfficial
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {instagramPosts.map(post => (
            <a href="#" key={post.id} className="group relative block w-full aspect-square overflow-hidden rounded-lg">
              <img 
                src={post.imageUrl}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-4 text-white font-bold">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
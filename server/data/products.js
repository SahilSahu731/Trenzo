// =================================================================
// CRITICAL: Replace this placeholder with a REAL admin user's _id 
// from your MongoDB 'users' collection.
// =================================================================
const adminUserId = '689824e8cf89f9575bcd47c1';

const products = [
  // --- Apparel ---
  {
    user: adminUserId,
    name: 'Men\'s Urban Explorer Jacket',
    image: {
      public_id: 'pexels/apparel_1',
      secure_url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Urban Explorer',
    category: 'Apparel',
    description: 'A stylish and durable jacket, perfect for city life and outdoor adventures. Water-resistant shell with a comfortable fleece lining.',
    price: 149.99,
    countInStock: 20,
    rating: 4.7,
    numReviews: 32,
  },
  {
    user: adminUserId,
    name: 'Women\'s Flowy Maxi Dress',
    image: {
      public_id: 'pexels/apparel_2',
      secure_url: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Summer Bloom',
    category: 'Apparel',
    description: 'An elegant and comfortable maxi dress made from breathable fabric. Ideal for summer days and evening events.',
    price: 89.99,
    countInStock: 15,
    rating: 4.9,
    numReviews: 45,
  },
  // --- Footwear ---
  {
    user: adminUserId,
    name: 'Classic Leather Boots',
    image: {
      public_id: 'pexels/footwear_1',
      secure_url: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Heritage Co.',
    category: 'Footwear',
    description: 'Handcrafted leather boots with a timeless design. Durable, comfortable, and built to last.',
    price: 220.00,
    countInStock: 12,
    rating: 4.8,
    numReviews: 55,
  },
  // --- Accessories ---
  {
    user: adminUserId,
    name: 'Minimalist Silver Watch',
    image: {
      public_id: 'pexels/accessories_1',
      secure_url: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Timeless Co.',
    category: 'Accessories',
    description: 'A sleek and modern watch with a stainless steel mesh strap and a minimalist face. Water-resistant up to 50m.',
    price: 180.50,
    countInStock: 30,
    rating: 4.9,
    numReviews: 60,
  },
  {
    user: adminUserId,
    name: 'Leather Crossbody Bag',
    image: {
      public_id: 'pexels/accessories_2',
      secure_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Urban Explorer',
    category: 'Accessories',
    description: 'A versatile and stylish crossbody bag made from genuine leather, with multiple compartments for your essentials.',
    price: 95.00,
    countInStock: 18,
    rating: 4.7,
    numReviews: 25,
  },
  // --- Electronics ---
  {
    user: adminUserId,
    name: 'Wireless Noise-Cancelling Headphones',
    image: {
      public_id: 'pexels/electronics_1',
      secure_url: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'AudioPhile',
    category: 'Electronics',
    description: 'Immerse yourself in sound with these high-fidelity wireless headphones featuring active noise cancellation and a 30-hour battery life.',
    price: 349.99,
    countInStock: 22,
    rating: 4.9,
    numReviews: 112,
  },
  // --- Home Goods ---
  {
    user: adminUserId,
    name: 'Scented Soy Candle',
    image: {
      public_id: 'pexels/home_goods_1',
      secure_url: 'https://images.pexels.com/photos/4050303/pexels-photo-4050303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Cozy Home',
    category: 'Home Goods',
    description: 'A hand-poured soy wax candle with a calming lavender and vanilla scent. 40+ hour burn time.',
    price: 24.99,
    countInStock: 100,
    rating: 4.8,
    numReviews: 88,
  },
  // --- Beauty ---
  {
    user: adminUserId,
    name: 'Organic Facial Serum',
    image: {
      public_id: 'pexels/beauty_1',
      secure_url: 'https://images.pexels.com/photos/3762693/pexels-photo-3762693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Pure Glow',
    category: 'Beauty',
    description: 'A hydrating and rejuvenating facial serum made with organic ingredients to give your skin a natural glow.',
    price: 45.00,
    countInStock: 40,
    rating: 4.9,
    numReviews: 95,
  },
  {
    user: adminUserId,
    name: 'Vibrant Running Shoes',
    image: {
      public_id: 'pexels/footwear_2',
      secure_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'Momentum',
    category: 'Footwear',
    description: 'Lightweight and responsive running shoes designed for maximum comfort and performance.',
    price: 130.00,
    countInStock: 30,
    rating: 4.7,
    numReviews: 72,
  },
  {
    user: adminUserId,
    name: 'Smart Fitness Tracker',
    image: {
      public_id: 'pexels/electronics_2',
      secure_url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    brand: 'FitTech',
    category: 'Electronics',
    description: 'Track your steps, heart rate, and sleep patterns with this sleek and water-resistant fitness tracker.',
    price: 99.00,
    countInStock: 60,
    rating: 4.5,
    numReviews: 150,
  },
];

export default products;
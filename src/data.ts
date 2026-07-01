import { Product, Category } from './types';

export const categories: Category[] = [
  { id: '1', title: 'Top Offers', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&q=80' },
  { id: '2', title: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&q=80' },
  { id: '3', title: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&q=80' },
  { id: '4', title: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=150&q=80' },
  { id: '5', title: 'Home', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=150&q=80' },
  { id: '6', title: 'Appliances', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=150&q=80' },
  { id: '7', title: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=150&q=80' },
];

export const bestOfElectronics: Product[] = [
  { id: 'p1', title: 'Wireless Noise Cancelling Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80', price: 1999, originalPrice: 4999, discount: 60, rating: 4.5, reviews: 12450, category: 'Electronics', assured: true, tagline: 'Bestseller' },
  { id: 'p2', title: 'Smart Fitness Watch Series 8', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80', price: 2499, originalPrice: 5999, discount: 58, rating: 4.2, reviews: 8430, category: 'Electronics', assured: true, tagline: 'From ₹1499' },
  { id: 'p3', title: 'MacBook Pro 16" M3 Max', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80', price: 245990, originalPrice: 265990, discount: 8, rating: 4.9, reviews: 3200, category: 'Electronics', assured: true, tagline: 'High Performance' },
  { id: 'p4', title: 'Professional DSLR Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80', price: 34999, originalPrice: 42999, discount: 18, rating: 4.6, reviews: 5412, category: 'Electronics', tagline: 'Top Rated' },
  { id: 'p5', title: 'Next-Gen Gaming Console', image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&q=80', price: 49990, originalPrice: 54990, discount: 9, rating: 4.8, reviews: 2150, category: 'Electronics', assured: true, tagline: 'Just Launched' },
];

export const trendingSmartphones: Product[] = [
  { id: 'm1', title: 'iPhone 15 Pro (Titanium, 256 GB)', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&q=80', price: 134900, originalPrice: 144900, discount: 6, rating: 4.9, reviews: 45210, category: 'Mobiles', assured: true },
  { id: 'm2', title: 'Samsung Galaxy S24 Ultra', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=80', price: 129999, originalPrice: 134999, discount: 3, rating: 4.8, reviews: 12450, category: 'Mobiles', assured: true },
  { id: 'm3', title: 'Google Pixel 8a (Obsidian, 128 GB)', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80', price: 49999, originalPrice: 54999, discount: 9, rating: 4.5, reviews: 3420, category: 'Mobiles', assured: true },
  { id: 'm4', title: 'OnePlus 12R (Iron Gray, 256 GB)', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cd8d3?w=300&q=80', price: 39999, originalPrice: 42999, discount: 6, rating: 4.6, reviews: 8900, category: 'Mobiles', assured: true },
];

export const topFashion: Product[] = [
  { id: 'f1', title: 'Men Solid Polo Collar T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80', price: 499, originalPrice: 1299, discount: 61, rating: 4.1, reviews: 2310, category: 'Fashion', assured: true },
  { id: 'f2', title: 'Women Fit & Flare Black Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80', price: 899, originalPrice: 2499, discount: 64, rating: 4.3, reviews: 4512, category: 'Fashion', assured: true },
  { id: 'f3', title: 'Men Regular Fit Solid Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=300&q=80', price: 699, originalPrice: 1999, discount: 65, rating: 4.0, reviews: 1120, category: 'Fashion' },
  { id: 'f4', title: 'Women High Neck White Top', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&q=80', price: 399, originalPrice: 999, discount: 60, rating: 4.4, reviews: 890, category: 'Fashion', assured: true },
];

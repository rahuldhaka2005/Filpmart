export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  category: string;
  assured?: boolean;
  tagline?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  title: string;
  image: string;
}

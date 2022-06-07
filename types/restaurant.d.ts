import type { Category } from "@/types/category";

export interface Restaurant {
  CategoryId: number;
  Category: Category;
  address: string;
  createdAt: string;
  description: string;
  id: number;
  image: string;
  name: string;
  opening_hours: string;
  tel: string;
  updatedAt: string;
  viewCounts: number;
};

export interface FavoriteRestaurant extends Restaurant {
  Favorite: Favorite;
}

interface Favorite {
  RestaurantId: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
}
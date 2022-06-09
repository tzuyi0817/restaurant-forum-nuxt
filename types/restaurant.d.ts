import type { Category } from "@/types/category";
import type { Comment } from "@/types/comment";

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
  FavoriteCount: number;
  isFavorited: boolean;
  Comments: Array<Comment>;
  isLiked: boolean;
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
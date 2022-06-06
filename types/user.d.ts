import type { Comment } from '@/types/comment';
import type { FavoriteRestaurant } from '@/types/restaurant';
import type { Follow } from '@/types/follow';

export interface Profile {
  Followings: Array<Follow>;
  Comments: Array<Comment>;
  FavoritedRestaurants: Array<FavoriteRestaurant>;
  Followers: Array<Follow>;
  createdAt: string;
  email: string;
  id: number;
  image: string | null;
  isAdmin: boolean;
  name: string;
  password: string;
  updatedAt: string;
}


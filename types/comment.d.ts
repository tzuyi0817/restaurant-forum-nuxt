import type { Restaurant } from '@/types/restaurant';
import type { Profile } from '@/types/user';

export interface Comment {
  Restaurant: Restaurant;
  RestaurantId: number;
  UserId: number;
  User: Profile;
  createdAt: string;
  id: number;
  text: string;
  updatedAt: string;
};
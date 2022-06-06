import type { Restaurant } from '@/types/restaurant';

export interface Comment {
  Restaurant: Restaurant;
  RestaurantId: number;
  UserId: number;
  createdAt: string;
  id: number;
  text: string;
  updatedAt: string;
};
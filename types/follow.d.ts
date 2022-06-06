interface CommonType {
  createdAt: string;
  email: string;
  id: number;
  image: null;
  isAdmin: boolean;
  name: string;
  password: string;
  updatedAt: string;
};

interface FollowShip {
  createdAt: string;
  followerId: number;
  followingId: number;
  updatedAt: string;
}

export interface Follow extends CommonType {
  Followship: FollowShip;
};

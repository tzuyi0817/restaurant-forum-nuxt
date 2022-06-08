export type UserId = {
  userId: number;
};

export type RestaurantId = {
  restaurantId: string;
};

export type CategoryId = {
  categoryId: string;
};

export type Form = {
  formData: FormData;
};

export type CreateComment = {
  restaurantId: string;
  text: string;
};

export type DeleteComment = {
  commentId: number;
};

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  name: string;
  passwordCheck: string;
} & SignIn;

export type UpdateRestaurant = Form & RestaurantId;
export type UpdateUser = Form & UserId;

export type QueryRestaurants = {
  page: string;
} & CategoryId;

export type CreateCategory = {
  name: string;
}

export type UpdateCategory = CreateCategory & CategoryId;

export type UpdateAdmin = {
  isAdmin: boolean;
} & UserId;

export type UserId = {
  userId: number;
};

export type RestaurantId = {
  restaurantId: number;
};

export type CategoryId = {
  categoryId: number;
};

export type Form = {
  formData: FormData;
};

export type CreateComment = RestaurantId & {
  text: string;
};

export type DeleteComment = {
  commentId: number;
};

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = SignIn & {
  name: string;
  passwordCheck: string;
};

export type UpdateRestaurant = Form & RestaurantId;
export type UpdateUser = Form & UserId;

export type QueryRestaurants = {
  page: string;
  categoryId: string
};

export type CreateCategory = {
  name: string;
};

export type UpdateCategory = CreateCategory & CategoryId;

export type UpdateAdmin = UserId & {
  isAdmin: boolean;
};

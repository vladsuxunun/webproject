export interface Item {
  title: string;
  link: string;

}
export interface IUser {
  id: number;
  username: string;
  password: string;
  first_name: string;
  email: string;
  is_admin: boolean;
}

export interface IRestaurant {
  id: number;
  name: string;
  image_url: string;
  address: string;
  contact: string;
  avg_cost: number;
}

export interface IDish {
  id: number;
  name: string;
  price: number;
  restaurant: IRestaurant;
  image_url: string
}

export interface IReview {
  id: number;
  text: string;
  user: IUser;
  restaurant: IRestaurant;
}

export interface IOrder {
  id: number;
  dish_name: string;
  count: number;
  user: IUser;
  dish_url: string;
}

export interface IAuthResponse {
  token: string;
  is_admin: boolean;
  name: string;
}

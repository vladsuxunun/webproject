import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IRestaurant, IDish, IReview, IOrder, IAuthResponse } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService{

  BASE_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {
  }


  // Restaurant
  getRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(`${this.BASE_URL}/api/restaurants/`);
  }

  postRestaurant(nName: any, nImageUrl: any, nAddress: any, nContact: any, nAvgCost: number): Observable<IRestaurant> {
     return this.http.post<IRestaurant>(`${this.BASE_URL}/api/restaurants/`, {
       name: nName,
       image_url: nImageUrl,
       address: nAddress,
       contact: nContact,
       avg_cost: nAvgCost
     });
   }

  getRestaurant(restaurantId: string): Observable<IRestaurant> {
   return this.http.get<IRestaurant>(`${this.BASE_URL}/api/restaurants/${restaurantId}/`, {});
  }

  putRestaurant(restaurant: IRestaurant): Observable<any> {
    return this.http.put(`${this.BASE_URL}/api/restaurants/${restaurant.id}/`, {
      name: restaurant.name,
      image_url: restaurant.image_url,
      address: restaurant.address,
      contact: restaurant.contact,
      avg_cost: restaurant.avg_cost 
    }); 
  }

  deleteRestaurant(restaurant: IRestaurant): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/restaurants/${restaurant.id}/`, {});
  }

  // Dish
  getDishes(restaurantId: string): Observable<IDish[]> {
    return this.http.get<IDish[]>(`${this.BASE_URL}/api/restaurants/${restaurantId}/dishes/`);
  }

  postDish(restaurant: IRestaurant, name: any, price: number, image_url: any ): Observable<IDish> {
    return this.http.post<IDish>(`${this.BASE_URL}/api/restaurants/${restaurant.id}/dishes/`, {
      name: name,
      price: price,
      image_url: image_url
    });
  }

  putDish(dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${this.BASE_URL}/api/dishes/${dish.id}/`, {
      name: dish.name,
      price: dish.price,
      image_url: dish.image_url
    });
  }

  deleteDish(dish: IDish): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/dishes/${dish.id}/`, {});
  }

  // Review
  getReviews(restaurantId: string): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.BASE_URL}/api/restaurants/${restaurantId}/reviews/`);
  }

  postReview(restaurant: IRestaurant, nText: any): Observable<IReview> {
    return this.http.post<IReview>(`${this.BASE_URL}/api/restaurants/${restaurant.id}/reviews/`,{
      text: nText
    });
  }

  // Order
  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.BASE_URL}/api/orders/`);
  }

  postOrder(dish_name: any, nCount: number, dish_url: any): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.BASE_URL}/api/orders/`,{
      dish_name: dish_name,
      count: nCount,
      dish_url: dish_url
    });
  }

  putOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.BASE_URL}/api/orders/${order.id}/`,{
      name: order.dish_name,
      count: order.count,
      dish_url: order.dish_url
    });
  }

  deleteOrder(order: IOrder): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/orders/${order.id}/`,{});
  }

  deleteOrders(): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/api/clear/`,{});
  }

  // Auth
  auth(login: any, pass: any): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.BASE_URL}/api/login/`, {
      username: login,
      password: pass
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/logout/`, {});
  }

  register(login: any, pass: any, name: any, nEmail: any): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.BASE_URL}/api/register/`, {
      username: login,
      password: pass,
      first_name: name,
      email: nEmail
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IRestaurant, IAuthResponse, IDish, IOrder, IReview, IUser } from './restaurant';


@Injectable({ providedIn: 'root' })
export class RestaurantService {

  private restaurantsUrl = 'api/restaurants';
  private ordersUrl = 'api/orders';
  private dishesUrl = 'api/dishes';
  private reviewsUrl = 'api/reviews';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getRestaurants (): Observable<IRestaurant[]> {
    const url = `${this.restaurantsUrl}`;
    return this.http.get<IRestaurant[]>(url)
      .pipe();
  }

  /** GET hero by id. Will 404 if id not found */
  getRestaurant(id: string): Observable<IRestaurant> {
    const url = `${this.restaurantsUrl}/${id}`;
    return this.http.get<IRestaurant>(url).pipe();
  }
    //////// Save methods //////////

  /** POST: add a new hero to the server */
  addRestaurant (restaurant: IRestaurant): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(this.restaurantsUrl, restaurant, this.httpOptions).pipe();
  }

  /** DELETE: delete the hero from the server */
  deleteRestaurant (restaurant: IRestaurant | number): Observable<IRestaurant> {
    const id = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${this.restaurantsUrl}/${id}`;
    return this.http.delete<IRestaurant>(url, this.httpOptions).pipe();
  }

  /** PUT: update the hero on the server */
  updateRestaurant (restaurant: IRestaurant): Observable<any> {
    return this.http.put(this.restaurantsUrl, restaurant, this.httpOptions).pipe();
  }

  // Dish
  getDishes(restaurantId: string): Observable<IDish[]> {
    
    const url = `${this.dishesUrl}?restaurantId=${restaurantId}`;
    return this.http.get<IDish[]>(url, this.httpOptions)
      .pipe();
  }
  // Review
  getReviews(restaurantId: string): Observable<IReview[]> {
    const url = `${this.reviewsUrl}?restaurantId=${restaurantId}`;
    return this.http.get<IReview[]>(url)
      .pipe(); }

  postReview(review: IReview): Observable<IReview> {
    const url = `${this.reviewsUrl}`;
    return this.http.post<IReview>(url, review, this.httpOptions).pipe();
  }

  // Order
  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.ordersUrl).pipe(); 
  }

  postOrder(order:IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.ordersUrl, order, this.httpOptions).pipe();
 
  }

  putOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(this.ordersUrl, order, this.httpOptions).pipe();
  }

  deleteOrder(order: IOrder): Observable<any> {
    const id = typeof order === 'number' ? order : order.id;
    const url = `${this.ordersUrl}/${id}`;
    return this.http.delete<IOrder>(url, this.httpOptions).pipe();
  }

  // Auth
  auth(login: any, pass: any){
   
  }

  logout(){
    
  }

  register(login: any, pass: any, name: any, nEmail: any){
    
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    alert(message);
  }

}
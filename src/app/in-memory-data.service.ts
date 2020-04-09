import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IRestaurant, IDish, IReview } from './restaurant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let restaurants = [
      { id: 1, name: 'Turandot', image_url: 'https://www.buro247.kz/images/Restaurants-Almaty-Spring-2016-13.jpg', address:'Tole Bi St 102', contact:'66563435665', avg_cost:3000},
      { id: 2, name: 'Beefeater', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Crit_Photo.jpg/1200px-Crit_Photo.jpg', address:'Dostyk Ave 43', contact:'3454345545', avg_cost:6000 },
      { id: 3, name: 'Olivier', image_url: 'https://pluspng.com/img-png/restaurant-png-hd--1920.png', address:'Kurmangazy St 43', contact:'2345675656', avg_cost:5000},
    ];
    let dishes = [
      {id: 1, name: 'Cheese plate', price:3200, restaurantId: 1},
      {id: 2, name: 'Ramen', price: 2000, restaurantId:3},
      {id: 3, name: 'Spring Rolls', price: 1700, restaurantId:2},
      {id: 4, name: 'Whoopie Pie', price:1000, restaurantId:2}
    ];
    let users = [
      {id: 1, username: 'user1', password:'user1', first_name: 'user1_f', email:'user1@gmail.com', is_admin:false},
      {id: 2, username: 'user2', password:'user2', first_name: 'user2_f', email:'user2@gmail.com', is_admin:true},
]
    let reviews = [
      {id: 1, text: 'Very good place, recommend to all', username: 'user0', restaurantId: 0},
      {id: 2, text:'Quite good, but prices are little bit expensive', username: 'user1', restaurantId: 1}
    ];

    let orders = [
      {id: 1, dish_name: 'Cheese plate', count: 1, user: users[0]},
      {id: 2, dish_name: 'Ramen', count:2, user: users[1]}
    ];
    return {restaurants, dishes, users, reviews, orders};
  }

 
  genId<T extends IRestaurant | IReview>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}

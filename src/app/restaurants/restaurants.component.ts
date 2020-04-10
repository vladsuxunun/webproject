import { Component, OnInit } from '@angular/core';

import { IRestaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  selectedRestaurant: IRestaurant;

  restaurants: IRestaurant[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  onSelect(restaurant: IRestaurant): void {
    this.selectedRestaurant = restaurant;
    }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
        .subscribe(restaurants => this.restaurants = restaurants);
  }

  add(name: string, image_url:string, address: string, contact: string, avg_cost: number): void {
    name = name.trim();
    if (!name || !address || !image_url || !contact || !avg_cost) { return; }
    this.restaurantService.addRestaurant({ name, image_url, address, contact, avg_cost } as IRestaurant)
      .subscribe(restaurant => {
        this.restaurants.push(restaurant);
      });
  }

  delete(restaurant: IRestaurant): void {
    this.restaurants = this.restaurants.filter(r => r !== restaurant);
    this.restaurantService.deleteRestaurant(restaurant).subscribe();
  }

}
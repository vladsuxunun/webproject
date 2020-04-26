import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IRestaurant, IReview, IUser}         from '../restaurant';
import { RestaurantService }  from '../restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: [ './restaurant-detail.component.css' ]
})
export class RestaurantDetailComponent implements OnInit {
  public restaurantId = '';
  public isLogged = false;
  public isAdmin = false;

  public reviews: IReview[] = [];
  public text = '';

  public restaurant: IRestaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.restaurantId = localStorage.getItem('restaurantId');
    this.getRestaurant();
    this.getReviews();

    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.isAdmin = (localStorage.getItem('isAdmin') === 'True' ? true : false);
    }
  }

  getRestaurant(): void {
    this.restaurantService.getRestaurant(this.restaurantId)
      .subscribe(
        restaurant => {
          this.restaurant = restaurant;
      })
    }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.restaurantService.putRestaurant(this.restaurant)
    .subscribe(
      res =>{
        alert(this.restaurant.name +" updated");
        this.goBack();
      })
  }
 
  getReviews(): void{
    this.restaurantService.getReviews(this.restaurantId)
      .subscribe(reviews => this.reviews = reviews);
  }

  sendReview() {
    if (this.isLogged && this.text) {
      this.restaurantService.postReview(this.restaurant, this.text).subscribe(res => {
        this.text = '';
        this.reviews.push(res);
      });
    }
  }
}
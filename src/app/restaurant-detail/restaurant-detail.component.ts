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
  public restaurantId = '2';
  public isLogged = true;
  public isAdmin = true;

  public reviews: IReview[] = [];
  public text = '';

  @Input() restaurant: IRestaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRestaurant();
    this.getReviews();
  }

  getRestaurant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(id.toString())
      .subscribe(restaurant => this.restaurant = restaurant);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.restaurantService.updateRestaurant(this.restaurant)
      .subscribe(() => this.goBack());
  }
 
  getReviews(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.getReviews(id.toString())
      .subscribe(reviews => this.reviews = reviews);
  }

  sendReview(text: any): void{
    if(!text) {return;}
    const username='usernew'
    this.restaurantService.postReview({text, username} as IReview)
      .subscribe(review =>{
        this.reviews.push(review);
      })
  }
}
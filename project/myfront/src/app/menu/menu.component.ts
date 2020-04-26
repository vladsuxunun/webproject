import { Component, OnInit } from '@angular/core';
import { IDish, IOrder } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public restaurantId = '1';
  public orders: IOrder[] = [];
  public isLogged = true;
  public isAdmin = true;

  public dishes: IDish[]=[];

  public count = 1;

  constructor(
    private restaurantService: RestaurantService, 
    private route: ActivatedRoute){
   }

  ngOnInit() {
   this.restaurantId =localStorage.getItem('restaurantId');
    this.getDishes();
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.isAdmin = (localStorage.getItem('isAdmin') === 'True' ? true : false);
    }
  }
  getDishes(): void {
    this.restaurantService.getDishes(this.restaurantId)
        .subscribe(dishes => this.dishes = dishes);
  }
  postOrder(dish: IDish) {
    if (this.count) {
      this.restaurantService.postOrder(dish.name, this.count, dish.image_url )
      .subscribe(order => {
        this.orders.push(order);
      });
    }
  }
  deleteDish(dish: IDish){
    this.restaurantService.deleteDish(dish)
      .subscribe()
  }

}

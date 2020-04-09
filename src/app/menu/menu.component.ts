import { Component, OnInit } from '@angular/core';
import { IDish, IOrder } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
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
   this.restaurantId =this.route.snapshot.paramMap.get('id');
    this.getDishes();
  }
  getDishes(): void {
    this.restaurantService.getDishes(this.restaurantId)
        .subscribe(dishes => this.dishes = dishes);
  }
  postOrder(dish: IDish) {
    if (this.count) {
      this.restaurantService.postOrder({ dish_name: dish.name, count: this.count} as IOrder)
      .subscribe(order => {
        this.orders.push(order);
      });
    }
  }

}

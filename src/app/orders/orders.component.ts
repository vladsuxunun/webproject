import { Component, OnInit } from '@angular/core';
import { IOrder } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: IOrder[]=[];
  public empty = false;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.restaurantService.getOrders()
        .subscribe(orders => this.orders = orders);
  }

  deleteOrder(order: IOrder): void {
    this.orders = this.orders.filter(o => o !== order);
    this.restaurantService.deleteOrder(order).subscribe();
  }

  deleteOrders(): void{
    this.orders.forEach(order => {
      this.deleteOrder(order)
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import {Item } from '../restaurant';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public items: Item[] = [
    { title: 'Home', link: '' },
    { title: 'Orders', link: 'orders' },
  ];

  public isLogged = false;
  public isAdmin = true;

  public userName = 'user1';

  constructor(restaurantService: RestaurantService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.isAdmin = (localStorage.getItem('isAdmin') === 'True' ? true : false);
      this.userName = localStorage.getItem('name');
    }
  }

  logout() {
  }
}

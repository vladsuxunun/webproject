import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent }  from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
 
  { path: 'restaurants/:id/menu', component: MenuComponent },
  { path: 'restaurants/:id', component: RestaurantDetailComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  {path: 'orders', component:OrdersComponent}, 
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
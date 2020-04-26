import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { RestaurantDetailComponent }  from './restaurant-detail/restaurant-detail.component';
import { RestaurantsComponent }      from './restaurants/restaurants.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
   
  ],
  declarations: [
    AppComponent,
    RestaurantsComponent,
    RestaurantDetailComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    OrdersComponent,
    LoginComponent,
    SignupComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public login = '';
  public password = '';
  public confirm = '';
  public email = '';
  public name = '';

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit() {
  }

  clear() {
    this.login = '';
    this.password = '';
    this.confirm = '';
    this.email = '';
    this.name = '';
  }

  signUp() {
    if (!this.login || !this.password || !this.confirm) {
      alert('Please provide username and password');
      this.clear();
    } else if (this.password !== this.confirm) {
      alert('Passwords do not coincide');
      this.clear();
    } else {
      this.restaurantService.register(this.login, this.password, this.name, this.email).subscribe(res => {
        this.clear();
        this.router.navigate(['/login']);
        alert('You were successfully signed up. Now, please, log in');
      })
    }
  }

}

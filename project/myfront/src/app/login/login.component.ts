import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login = '';
  public password = '';

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/']);
    }
  }

  clear() {
    this.login = '';
    this.password = '';
  }

  auth() {
    if (!this.login || !this.password) {
      alert('Please, provide full information');
      this.clear();
    } else {
      this.restaurantService.auth(this.login, this.password).subscribe(res => {
        this.clear();
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.name);
        if (res.is_admin) {
          localStorage.setItem('isAdmin', 'True');
        } else {
          localStorage.setItem('isAdmin', 'False');
        }
        window.location.reload();
      })
    }
  }

}

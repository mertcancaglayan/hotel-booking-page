import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  loggedUserData: any;

  constructor(private router: Router) {
    const localData = localStorage.getItem('hotelUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLogOut() {
    localStorage.removeItem('hotelUser');
    this.loggedUserData = undefined;

    this.router.navigateByUrl('/login');
  }
}

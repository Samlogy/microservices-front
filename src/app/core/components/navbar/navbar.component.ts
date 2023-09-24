import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.router.navigate(['/']);
  }
  onLogin() {
    this.router.navigate(['/']);
  }
  onRegister() {
    this.router.navigate(['/register']);
  }
}

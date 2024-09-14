import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private readonly authService: AuthService) {}

  isLoggedIn = computed(() => this.authService.isAuth());

  ngOnInit() {
    this.authService.getMe();
  }
  logout() {
    this.authService.logout();
  }
}

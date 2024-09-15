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
  currentUser = computed(() => this.authService.currentUser());

  // This can be placed on some other root level component =)
  ngOnInit() {
    this.authService.getMe().subscribe();
  }

  logout() {
    this.authService.logout();
  }
}

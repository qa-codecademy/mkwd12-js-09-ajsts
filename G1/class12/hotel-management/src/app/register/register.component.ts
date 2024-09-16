import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notifications.service';
import { Route, Router } from '@angular/router';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { User } from '../../types/user.interface';
import { NotificationType } from '../../types/notification-type.enum';
import { Auth } from '../../types/auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  register({email, password}: Auth) {
    return this.authService.register(email, password).subscribe((response) => {
      if(!response) {
        this.notificationService.showNotification('Invalid credentials', '', NotificationType.Error);
        return;
      }
      this.notificationService.showNotification('Successfully registered', '', NotificationType.Success);
      this.router.navigate(['/login'])
    })
  }
}

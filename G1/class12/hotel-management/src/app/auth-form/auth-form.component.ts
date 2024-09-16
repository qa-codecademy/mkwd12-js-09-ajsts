import { Component, computed, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notifications.service';
import { NotificationType } from '../../types/notification-type.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {

  type = input<'Login' | 'Register'>('Login');
  oppositeOfType = computed(() =>
    this.type() === 'Login' ? 'register' : 'login',
  );
  onSubmit = output<{ email: string; password: string }>();

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly notificationService: NotificationService
  ) {}

  // New way of injecting dependencies - can be used in a non-class context
  // inject(NotificationService) nf

  submit() {
    const { email, password } = this.authForm.value;

    if (this.authForm.invalid || !email || !password) {
      this.notificationService.showNotification('Invalid credentials', 'Submit', NotificationType.Error);
      return;
    }

    this.onSubmit.emit({ email, password });
  }

}

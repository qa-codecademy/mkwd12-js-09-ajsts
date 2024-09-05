import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);

  loginForm = this.generateForm();

  generateForm() {
    return new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) return;

    console.log(this.loginForm.value);

    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });

    this.loginForm.reset();
  }
}

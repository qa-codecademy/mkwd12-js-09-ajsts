import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterReq } from '../../auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);

  isSubmitted = signal(false);

  registerForm = this.generateForm();

  generateForm() {
    return new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      this.passwordMatchValidator
    );
  }

  passwordMatchValidator(form: AbstractControl): null {
    const passwordCtrl = form.get('password');
    const confirmCtrl = form.get('confirmPassword');

    if (passwordCtrl.value !== confirmCtrl.value) {
      confirmCtrl.setErrors({ passwordMismatch: true });
    } else {
      confirmCtrl.setErrors(null);
    }

    return null;
  }

  // passwordMatchValidator(form: AbstractControl) {
  //   const passwordValue = form.get('password')?.value;
  //   const confirmPasswordValue = form.get('confirmPassword')?.value;

  //   if (passwordValue !== confirmPasswordValue) {
  //     return { passwordMismatch: true };
  //   }

  //   return null;
  // }

  onFormSubmit() {
    this.registerForm.markAllAsTouched();
    this.isSubmitted.set(true);

    if (this.registerForm.invalid) return;

    console.log(this.registerForm.value);

    const req: RegisterReq = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.registerUser(req);
  }
}

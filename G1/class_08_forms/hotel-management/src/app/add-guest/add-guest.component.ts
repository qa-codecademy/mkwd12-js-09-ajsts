import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GuestsService } from '../../services/guests.service';
import { CreateGuest } from '../../types/guest.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-guest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  templateUrl: './add-guest.component.html',
  styleUrl: './add-guest.component.css',
})
export class AddGuestComponent implements OnInit, OnDestroy {
  guestForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    passportNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
  });
  subscription: Subscription = new Subscription();

  constructor(
    private readonly guestsService: GuestsService,
    private readonly router: Router
  ) {}

  get firstNameErrors(): string {
    // first if as example of handling proper state for validation:
    // form control MUST be invalid AND (either touched OR dirty)
    // if (
    //   this.guestForm.get('firstName')?.invalid &&
    //   (this.guestForm.get('firstName')?.touched ||
    //     this.guestForm.get('firstName')?.dirty)
    // ) {
    if (this.guestForm.get('firstName')?.errors?.['required']) {
      return 'First Name is required';
    }

    if (this.guestForm.get('firstName')?.errors?.['minlength']) {
      return 'First Name must have at least 3 characters';
    }

    if (this.guestForm.get('firstName')?.errors?.['maxlength']) {
      return 'First Name must be at most 20 characters long';
    }
    // }

    return '';
  }

  get lastNameErrors(): string {
    if (this.guestForm.get('lastName')?.errors?.['required']) {
      return 'Last Name is required';
    }

    if (this.guestForm.get('lastName')?.errors?.['minlength']) {
      return 'Last Name must have at least 3 characters';
    }

    if (this.guestForm.get('lastName')?.errors?.['maxlength']) {
      return 'Last Name must be at most 50 characters long';
    }

    return '';
  }

  get emailErrors(): string {
    if (this.guestForm.get('email')?.errors?.['required']) {
      return 'Email is required';
    }

    if (this.guestForm.get('email')?.errors?.['email']) {
      return 'Email must be in valid format';
    }

    return '';
  }

  get dateOfBirthErrors(): string {
    if (this.guestForm.get('dateOfBirth')?.errors?.['required']) {
      return 'Date of birth is required';
    }

    return '';
  }

  get phoneNumberErrors(): string {
    if (this.guestForm.get('phone')?.errors?.['required']) {
      return 'Phone number is required';
    }

    return '';
  }

  get addressErrors(): string {
    if (this.guestForm.get('address')?.errors?.['required']) {
      return 'Address is required';
    }

    if (this.guestForm.get('address')?.errors?.['maxlength']) {
      return 'Address must be at most 100 characters long';
    }

    return '';
  }

  get passportNumberErrors(): string {
    if (this.guestForm.get('passportNumber')?.errors?.['required']) {
      return 'Passport number is required';
    }

    if (this.guestForm.get('passportNumber')?.errors?.['maxlength']) {
      return 'Passport number must be at most 20 characters long';
    }

    return '';
  }

  ngOnInit(): void {
    // this.guestForm.valueChanges.subscribe((value) => console.log(value));
  }

  onSubmit() {
    if (this.guestForm.invalid) {
      alert('Form is not valid');
      return;
    }
    console.log('Submitting...', this.guestForm.value);

    this.subscription = this.guestsService
      .addGuest(this.guestForm.value as CreateGuest)
      .subscribe(() => this.router.navigate(['/rooms']));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

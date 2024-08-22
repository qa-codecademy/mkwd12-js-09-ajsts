import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css',
})
export class ReactiveComponent {
  applicationForm: FormGroup;

  ngOnInit() {
    this.applicationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      phoneNumber: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      coverLetter: new FormControl(''),

      pastWorkExperiences: new FormArray([]),
    });
  }

  onHandleSubmit() {
    console.log(this.applicationForm);

    const isFormInvalid = this.applicationForm.invalid;
    if (isFormInvalid) return;

    const values = this.applicationForm.value;

    console.log('form values:', values);

    this.applicationForm.reset();
  }

  getErrorMessage(controlName: string, errorName: string): string | null {
    const control = this.applicationForm.get(controlName);

    if (control?.hasError(errorName) && control.touched) {
      switch (errorName) {
        case 'required':
          return `Enter ${controlName}`;
        case 'minlength':
          return `Enter more then 3 charactes`;
        case 'email':
          return `Enter valid email`;
        default:
          return null;
      }
    }
    return null;
  }

  onAddExperience() {
    const control = new FormControl('');

    (<FormArray>this.applicationForm.get('pastWorkExperiences')).push(control);

    console.log(this.applicationForm);
  }

  getControls() {
    const formArrayControl = this.applicationForm.get(
      'pastWorkExperiences'
    ) as FormArray;

    return formArrayControl.controls;
  }
}

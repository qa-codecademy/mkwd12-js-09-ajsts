import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
})
export class MovieFormComponent {
  reviewForm = this.generateForm();

  ngOnInit() {}

  generateForm() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      year: new FormControl(1850, [Validators.required, Validators.min(1850)]),
      author: new FormControl('', Validators.required),
      rating: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      text: new FormControl('', Validators.required),
      genres: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    console.log('Form submitted');
    console.log(this.reviewForm.value);
  }
}

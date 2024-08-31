import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Movie, ReviewFormValue } from '../../models/movie.model';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
})
export class MovieFormComponent {
  editReviewData = input<Movie>();
  submitOutput = output<ReviewFormValue>();

  reviewForm = this.generateForm();

  movieSubmitted = signal(false);

  constructor() {
    effect(() => {
      if (this.editReviewData()) this.populateForm(this.editReviewData());
    });
  }

  generateForm() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      year: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1850),
      ]),
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

  populateForm(movie: Movie) {
    //Removing properties that aren't matched to controls in the form
    // const { id, likeCount, ...restOfMovie } = movie;

    this.reviewForm.setValue({
      title: movie.title,
      author: movie.author,
      genres: movie.genres,
      director: movie.director,
      year: movie.year,
      text: movie.text,
      rating: Math.floor(movie.rating),
    });

    this.reviewForm.controls.director.disable();
    this.reviewForm.controls.title.disable();
    this.reviewForm.controls.year.disable();
  }

  onFormSubmit() {
    this.movieSubmitted.set(true);
    this.reviewForm.markAllAsTouched();

    if (this.reviewForm.invalid) return;

    //if you want to read fields that are disabled oyu can use this
    console.log('Raw value', this.reviewForm.getRawValue());

    console.log('Form submitted');
    console.log(this.reviewForm.value);

    //Output when the form is valid and submitted
    this.submitOutput.emit(this.reviewForm.value as ReviewFormValue);
  }
}

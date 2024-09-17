import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Review, AddReviewReq } from '../../review.model';
import { RatingPanelComponent } from '../../../../shared/components/rating-panel/rating-panel.component';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    RatingPanelComponent,
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
})
export class MovieFormComponent {
  editReviewData = input<Review>();
  submitOutput = output<AddReviewReq>();

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
      poster: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      year: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1850),
      ]),
      rating: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      text: new FormControl('', Validators.required),
      genres: new FormControl('', Validators.required),
    });
  }

  populateForm(review: Review) {
    //Removing properties that aren't matched to controls in the form
    // const { id, likeCount, ...restOfMovie } = movie;

    this.reviewForm.setValue({
      title: review.title,
      poster: review.poster,
      genres: review.genres,
      director: review.director,
      year: review.year,
      text: review.text,
      rating: Math.floor(review.rating),
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
    this.submitOutput.emit(this.reviewForm.value as AddReviewReq);
  }

  onChangeRating(rating: number) {
    this.reviewForm.controls.rating.setValue(rating);
  }
}

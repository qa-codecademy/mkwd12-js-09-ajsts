import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

const blockedWords: string[] = [
  'money',
  'casino',
  'betting',
  'drugs',
  'guns',
  'french words',
];

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit {
  expensesForm = this.generateExpenseForm();

  paymentTypes: string[] = ['cash', 'card'];

  maxCommentLength = 90;

  get basicDataCtrls() {
    return this.expensesForm.controls.basicData.controls;
  }

  ngOnInit(): void {
    this.expensesForm.controls.comment.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        console.log(value);
      });
  }

  populateForm() {
    this.expensesForm.setValue({
      basicData: {
        title: 'FROM BACKEND',
        amount: 388,
        date: '2024-08-28',
      },
      priority: 'high',
      comment: 'i have come from the backend',
      type: 'card',
    });

    this.expensesForm.updateValueAndValidity();
  }

  generateExpenseForm() {
    return new FormGroup({
      basicData: new FormGroup({
        title: new FormControl('', [
          Validators.required,
          this.blockedWordsValidator,
        ]),
        amount: new FormControl(0, [
          Validators.required,
          Validators.min(1),
          Validators.max(500),
        ]),
        date: new FormControl('2024-08-29', Validators.required),
      }),
      priority: new FormControl('medium'),
      comment: new FormControl('', Validators.maxLength(this.maxCommentLength)),
      type: new FormControl('cash'),
    });

    //Linear form ( without grouping )
    // return new FormGroup({
    //   title: new FormControl('', [
    //     Validators.required,
    //     this.blockedWordsValidator,
    //   ]),
    //   amount: new FormControl('', [
    //     Validators.required,
    //     Validators.min(1),
    //     Validators.max(500),
    //   ]),
    //   date: new FormControl('2024-08-29', Validators.required),
    //   priority: new FormControl('medium'),
    //   comment: new FormControl('', Validators.maxLength(this.maxCommentLength)),
    //   type: new FormControl('cash'),
    // });
  }

  onFormSubmit() {
    console.log(this.expensesForm.invalid);
    console.log(this.expensesForm.value);

    this.expensesForm.reset();

    console.log('form submitted');
  }

  blockedWordsValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    console.log('inside custom validator');

    // Custom validators work by returning an object with the error as key and boolean as value if the control is invalid or null if the control is valid
    if (blockedWords.includes(control.value.toLowerCase())) {
      return { wordIsBlocked: true };
    }

    return null;
  }
}

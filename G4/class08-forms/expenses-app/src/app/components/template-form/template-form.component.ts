import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent implements OnInit, AfterViewInit {
  expenseForm = viewChild<NgForm>('expenseForm');
  expenseTitle = viewChild<NgModel>('expenseTitle');

  @ViewChild('expenseForm') decoratorExpenseForm: NgForm;

  maxCommentLength = 90;

  paymentTypes: string[] = ['cash', 'credit'];

  ngOnInit(): void {
    // If using signal view child, the value can be read here
    console.log('Signal view child', this.expenseForm());
    console.log('Decorator view child', this.decoratorExpenseForm);
  }

  ngAfterViewInit(): void {
    //If using decorator view child you will need to read the value here
    console.log('After view init');
    console.log('Signal view child', this.expenseForm());
    console.log('Decorator view child', this.decoratorExpenseForm);
  }

  onFormSubmit(form: NgForm) {
    console.log(this.expenseForm()?.value);
    console.log('form submitted');
    console.log(form.value);
  }
}

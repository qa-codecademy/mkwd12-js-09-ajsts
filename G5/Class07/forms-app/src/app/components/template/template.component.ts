import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {
  @ViewChild('myForm') myForm: NgForm;

  // ** WAY #1 => Reading the form reference passed as an argument on the submit method
  onHandleSubmit(formReference: NgForm) {
    console.log('MY FORM REFERENCE', this.myForm);
    console.log('Submitted', formReference);

    const value = formReference.form.value;

    // Same as above, but we use double destuctoring
    // const {
    //   form: { value },
    // } = formReference;

    console.log(value);
  }

  // ** WAY #2 => Reading the form reference from the component using @ViewChild (the reference is in the ViewChild('REFERENCE_HERE'))
  // onHandleSubmit() {
  //   console.log(this.myForm);

  //   const value = this.myForm.form.value;

  //   console.log(value);

  //   this.myForm.resetForm();
  // }
}

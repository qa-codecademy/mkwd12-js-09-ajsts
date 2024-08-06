import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Person } from './models/person.model';
import { ParentComponent } from './components/parent/parent.component';

enum Course {
  REACT = 'React',
  ANGULAR = 'Angular',
}

@Component({
  selector: 'app-root', //This is the selector or html tags we use to add this component in another template ( html file )
  standalone: true,
  imports: [RouterOutlet, ParentComponent],
  templateUrl: './app.component.html', // This is the url to the template file (html) that we use to connect to the component
  styleUrl: './app.component.scss', // This is the url to the css file (.scss) that we use to connect to the component
})
export class AppComponent {
  title = 'Starter G4';
  description = 'This Angular course will be 15 classes long';

  person: Person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    country: 'USA',
  };

  imgSrc =
    'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png';

  isBtnDisabled = true;
  course = Course.ANGULAR;

  inputValue = '';

  printPersonFullname(firstName: string, lastName: string) {
    console.log(`The person's full name is: ${firstName} ${lastName}`);
  }

  changeProperties() {
    this.title = 'OMG IT HAS CHANGED';
    this.person.firstName = 'Chad';

    console.log('change btn clicked');
  }

  onChangeCourse() {
    this.course =
      this.course === Course.ANGULAR ? Course.REACT : Course.ANGULAR;
  }

  onInputChange(event: Event) {
    // !AVOID USING ANY AS A TYPE LIKE THE PLAGUE OF 1256
    const target = event.target as HTMLInputElement;

    this.inputValue = target.value;

    console.log('input change event');
  }
}

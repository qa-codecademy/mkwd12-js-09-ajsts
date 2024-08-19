import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent {
  // *** EXAMPLE 1 ***
  fullName: Observable<string> = of('Bob Bobski');

  animals: Observable<(string | number)[]> = of([
    'Labrador',
    'Persian Cat',
    'Fish',
    'Bear',
    5,
  ]);

  // *** EXAMPLE 2 ***
  moviesObservable: Observable<string[]>;

  constructor() {
    this.moviesObservable = new Observable((observer) => {
      // next => will add a value in the observable (data stream)
      observer.next(['Lord of the Rings', 'The Hobbit']);
      observer.next(['Harry Potter', 'John Wick']);
    });
  }

  ngOnInit() {
    // *** EXAMPLE 1 ***
    console.log(this.fullName);

    /**
     * WHEN WE SUBSCRIBE TO AN OBSERVABLES
     * WE BECOME OBSERVERS
     */
    this.fullName.subscribe((data) => {
      console.log('Data of fullname observable:', data);
    });

    console.log(this.animals);

    this.animals.subscribe((value) => {
      console.log('data animasl', value);
    });

    // *** EXAMPLE 2 ***
    this.moviesObservable.subscribe((movies) => {
      console.log('movies:', movies);
    });
  }
}
